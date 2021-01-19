const creepsConfig = require('./role.base')()
module.exports = function () {
	_.assign(Creep.prototype, extensions);
}

const extensions = {
	work: () => {
		if (!(this.memory.role in creepsConfig)) return;
		const creepConfig = creepsConfig[this.role];
		if (!this.memory.ready) {
			if (creepConfig.prepare) this.memory.ready = creepConfig.prepare(this);
			else this.memory.ready = true;
		}
		if (!this.memory.prepare) return;
		const working = creepConfig.source ? this.memory.working : true;
		let stateChange = false;
		if (working) {
			if (creepConfig.target && creepConfig.target(this))
				stateChange = true;
		}
		else {
			if (creepConfig.source && creepConfig.source(this))
				stateChange = false;
		}
		if (stateChange) this.memory.working = !this.memory.working;
	},

	//根据role获取任务
	getTask: role => {
		let tasks = this.room.memory.tasks[role];
		if (tasks.length <= 0) return null;
		return tasks.shift();
	},

	//建造操作
	buildStructure: targetId => {
		let target = Game.getObjectById(targetId);
		if (!target || !(target instanceof ConstructionSite)) {
			delete this.memory.task;
			//			delete this.room.memory.tasksToken[this.name];
			return false;
		}
		if (this.build(target) == ERR_NOT_IN_RANGE) this.moveTo(target);
		return true;
	},

	//升级操作
	upgrade: () => {
		if (this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) this.moveTo(this.room.controller);
	},

	//填充操作
	fill: targetId => {
		let target = Game.getObjectById(targetId);
		if (!target || !(target instanceof StructureSpawn || target instanceof StructureExtension || target instanceof StructureStorage)) {
			delete this.memory.targetId;
			delete this.memory.task;
			return;
		}
		if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.moveTo(target);
	}
}
