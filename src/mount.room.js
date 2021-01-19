const creepController = require('./controller.creep')()
import releaseCreep from './plan.creep.js'
require('./global.js')
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
	add: creepName => {
		this.memory.spawnList.push(creepName);
	},

	releaseCreep: function (creepRole) {
		releaseCreep(creepRole, this);
	}
}
