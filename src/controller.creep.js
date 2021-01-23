const roles = require('./role.base')()
module.exports = () => ({
	creepNumberListener: () => {
		if (Game.time % 5) return;
		for (const name in Memory.creeps) {
			if (name in Game.creeps) continue;
			const creepConfig = Memory.creepConfig[name];
			if (!creepConfig) delete Memory.creeps[name];
			const role = creepConfig.role;
			if (roles[role].isNeed && !roles[role].isNeed(creepConfig.room)) {
				delete Memory.creepConfigs[name];
				delete Memory.creeps[name];
			}
			const room = Game.rooms[creepConfig.room];
			if (room.addSpawnTask(name) != ERR_NAME_EXISTS)
				delete Memory.creeps[name];
		}
	},

	creepApi: {
		add: (creepName, creepData) => {
			if (!Memory.creepConfigs) Memory.creepConfigs = {};
			Memory.creepConfigs[creepName] = creepData;
			const room = Game.rooms[creepData.room];
			if (!room) return ERR_NOT_OWNER;
			room.addSpawnTask(creepName);
			return OK;
		}
	}
})
