require('./mount.room')
require('./mount.creep')
const creepListener = require('./controller.creep')().creepNumberListener;
module.exports.loop = function () {
	for (const name in Game.rooms) {
		Game.rooms[name].work();
	}
	for (const name in Game.creeps) {
		Game.creeps[name].work();
	}
	creepListener();
}
