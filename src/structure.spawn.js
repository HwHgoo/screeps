const configs = require('./setting')
module.exports = function () {
	_.assign(StructureSpawn, extensions);
}

const extensions = {
	work: () => {
		if (this.spawning) {
			if (this.spawning.needTime - this.spawning.remainingTime == 1) {
				this.room.addTransferTask();
			}
		}
		if (!this.room.memory.spawnList) this.room.memory.spawnList = [];
		if (this.spawning || this.room.memory.spawnList.length == 0) return;
		const task = this.room.memory.spawnList[0];
		const spawnResult = this.mySpawnCreep(task);
		if (spawnResult == OK) {
			this.room.memory.spawnList.shift();
		}
		else if (spawnResult == ERR_NOT_ENOUGH_ENERGY && Memory.creepConfigs[task].role == 'filler')
			this.hangTask();
	},

	mySpawnCreep: configName => {
		const creepConfig = Memory.creepConfigs[configName];
		if (!creepConfig) return OK;
		const body = this.getBody(creepConfig.role);
		const spawnResult = this.spawnCreep(body, configName, creepConfig);
		if (spawnResult == OK || spawnResult == ERR_NAME_EXISTS)
			return OK;
		else
			return spawnResult;

	},

	getBody: role => {
		const bodyConfig = configs.bodyConfigs[role][this.room.controller.level];
		const body = [];
		for (let part in bodyConfig) {
			for (let i = 0; i < bodyConfig[part]; i++) body.push(part);
		}
		return body;
	},

	hangTask: () => {
		const task = this.room.memory.spawnList.shift();
		this.room.memory.spawnList.push(task);
	}
}
