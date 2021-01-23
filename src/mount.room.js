const creepController = require('./controller.creep')()
const releaseCreep = require('./plan.creep').releaseCreep;
module.exports = function () {
	_.assign(Room, extensions);
}


const extensions = {
	work: function () {
		const structures = this.find(FIND_MY_STRUCTURES);
		if (structures.length > 0) {
			for (let structure of structures) {
				if (structure.work) {
				}
			}
		}
	},

	releaseCreep: function (creepRole) {
		releaseCreep(creepRole, this);
	},

	addSpawnTask: function (name) {
		if (this.hasSpawnTask(name) > -1)
			this.memory.spawnList.push(name);
		else
			return ERR_NAME_EXISTS;
	},

	hasSpawnTask: function (name) {
		const index = this.memory.spawnList.indexOf(name);
		return index;
	},

	addTransferTask: function () {
		let spawns = this.find(FIND_MY_SPAWNS, {
			filter: spawn => spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		});
		let extensions = this.find(FIND_MY_STRUCTURES, {
			filter: structure => structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		});
		//不管之前的任务队列，直接重新给transferTasks赋值
		if (!this.memory.tasks) this.memory.tasks = {};
		this.memory.tasks.filler = [];
		this.memory.transerTasks.concat(spawns.map(sp => sp.id), extensions.map(ex => ex.id));
	},

	addBuildTask: function (siteId) {
		if (!this.memory.tasks) this.memory.tasks = {};
		if (!this.memory.tasks.builder) this.memory.tasks.builder = [];
		this.memory.tasks.builder.push(siteId);
	}
}
