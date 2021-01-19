require('./structure.spawn')
require('./structure.controller')
module.exports = () => {
	work: room => {
		const structures = room.find(FIND_MY_STRUCTURES);
		if (structures.len > 0) {
			for (let structure of structures) {
				structures.work();
			}
		}
	}
}
