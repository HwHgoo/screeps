const creepApi = require('./controller.creep')().creepApi
Function.prototype.setNextPlan = function (nextPlan) {
	return args => {
		const canExec = this(args);
		if (!canExec) return nextPlan(args);
		return canExec;
	}
}

const releasePlans = {
	harvester: {
		getStats: room => {
			//如果还没有注册source就注册一下
			if (!room.memory.sources) {
				const sources = room.find(FIND_SOURCES);
				if (!sources) {
					console.log(`${room} no sources found!`);
					return;
				}
				room.memory.sources = [];
				for (let source of sources) {
					room.memory.sources.push({source: source.id, nearLink: undefined});
				}
			}
			const stats = {};
			//尝试获取source旁边的link
			room.memory.sources.map(s => {
				const nearLinks = Game.getObjectById(s.source).pos.find(FIND_MY_STRUCTURES, 2, {
					filter: s => s.structureType == STRUCTURE_LINK
				});
				return {
					source: s.source,
					nearLink: nearLinks.length > 0 ? nearLink[0].id : undefined
				}
			});

			stats.sources = room.memory.sources;
			if (room.memory.centerLink) stats.centerLinkId = room.memory.centerLink;
			if (room.storage) stats.storage = room.storage.id;
			return stats;
		},

		plans: [
			//有storage和centerlink，且可以通过sourcelink转移能量时
			({room, storageId, centerLinkId, sources}) => {
				if (!storageId || !centerLinkId)
					return false;
			},

			({room, sources}) => {
				sources.forEach((sourceDetail, index) => {
					const creepName = `${room.name} harvester${index}`;
					const creepConfig = {role: 'harvester', sourceid: sourceDetail.source, room: room.name};
					creepApi.add(creepName, creepConfig);
					return true;
				})
			}
		]
	}
}


const planChains = {};
Object.keys(releasePlans).forEach(role => {
	planChains[role] = releasePlans[role].plans.reduce((pre, next) => pre.setNextPlan(next));
});


const releaseHarvester = function (room) {
	//先删除所有配置项
	//for conifg in conifgs : remove
	//然后重新发布
	planChains.harvester(releasePlans.harvester.getStats(room));
	return OK;
}

const roleToRelease = {
	'harvester': releaseHarvester,
}

export const releaseCreep = function (room, role) {
	return roleToRelease[role](room);
}
















