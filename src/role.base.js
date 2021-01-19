module.exports = () => ({
	harvester: {
		//准备阶段，向container或者source移动
		prepare: creep => {
			let target = Game.getObjectById(creep.memory.targetId);
			target = target ? target : Game.getObjectById(creep.memory.sourceId);
			const range = target instanceof Source ? 1 : 0;
			creep.moveTo(target);
			return creep.pos.inRangeto(target, range);
		},

		//维护container，没有就建一个
		source: creep => {
			creep.say('maintain my container');
			//没有能量就采集
			if (creep.store[RESOURCE_ENERGY] <= 0) {
				creep.harvester(Game.getObjectById(creep.memory.sourceId));
				return false;
			}
			//获取container
			let target = Game.getObjectById(creep.memory.targetId);
			//如果有container
			if (target && target instanceof StructureContainer) {
				creep.repair(target);
				return target.hits >= target.hitsMax;
			}
			//没有container就建一个
			let site = null;
			if (!creep.memory.targetId) creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
			else site = Game.getObjectById(creep.memory.targetId);
			//缓存工地
			if (!site) site = creep.pos.lookfor(LOOK_CONSTRUCTION_SITES).find(s => s.structureType == STRUCTURE_CONTAINER);
			//还是没找到就表示建好了
			if (!site) {
				const container = creep.pos.lookfor(LOOK_STRUCTURES).find(s => s.structureType == STRUCTURE_CONTAINER);
				if (container) {
					creep.memory.targetId = container.id;
					creep.room.releaseCreep('filler');
					creep.room.releaseCreep('upgrader');
					return true;
				}
				return false;
			}
			else creep.memory.targetId = site.id;
			creep.build(site);
		},

		//采集阶段就无脑采集就行
		target: creep => {
			const source = Game.getObjectById(creep.memory.sourceId);
			if (creep.ticksToLive < 2) creep.drop(RESOURCE_ENERGY);
			return false;
		}
	},

	builder: {
		isNeed: creep => {
			const sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
			return sites.length > 0 ? true : false;
		},

		prepare: creep => {
			if (!creep.memory.task) {
				creep.memory.task = creep.getTask(creep.role);
				creep.memory.sourceId = task.sourceId;
				creep.memory.targetId = task.targetId;
			}
			//还没有任务信息就让creep采之前的source去升级controller
			if (!creep.memory.task) return true;
			const source = Game.getObjectById(creep.memory.sourceId);
			creep.moveTo(source);
			return creep.pos.isRangeto(souce, 1);
		},

		source: creep => {
			if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) return true;
			const source = Game.getObjectById(creep.memory.sourceId);
			creep.getEnergyFrom(source);
		},

		target: creep => {
			let state = creep.buildStructure(creep.memory.targetId);
			if (!state) creep.upgrade();
			if (creep.store.getUsedCapacity() == 0) return true;
		}
	},

	filler: {
		isNeed: creep => {
			const container = Game.getObjectById(creep.memory.sourceId);
			return container && container instanceof StructureContainer;
		},

		prepare: creep => {
			if (!creep.memory.task) {
				creep.memory.task = creep.getTask(creep.role);
				creep.memory.targetId = creep.memory.task.targetId;
			}
			let container = Game.getObjectById(creep.memory.sourceId);
			if (creep.pos.inRangeto(container, 1)) return true;
			creep.moveTo(container);
		},

		source: creep => {
			if (creep.store.getFreeCapacity() == 0) return true;
			let container = Game.getObjectById(creep.memory.sourceId);
			creep.getEnergyFrom(container);
		},

		target: creep => {
			creep.fill(targetId);
			if (creep.store[RESOURCE_ENERGY] <= 0) return true;
		}
	}
})




















