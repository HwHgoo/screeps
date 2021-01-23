module.exports = function () {
	_.assign(StructureController, extensions);
}

const extensions = {
	work: () => {
		if (Game.time % 20) return;
		if (stateScanner()) onLevelChange(this.level);
	},

	onLevelChange: (level) => {
		if (level == 1) {
			this.room.releaseCreep('harvester');
			this.room.releaseCreep('builder');
		}
		//this.room.planLayout();
	},

	stateScanner: () => {
		let hasLevelChange = false;
		if (!Memory.stats || !Memory.stats.rooms)
			Memory.stats = {rooms: {}};
		if (!Memory.stats.rooms[this.room.name])
			Memory.stats.rooms[this.room.name] = {};
		Memory.stats.rooms[this.room.name].controllerRatio = (this.progress / this.progressTotal) * 100;
		if (Memory.stats.rooms[this.room.name].controllerLevel != this.level)
			hasLevelChange = true;
		Memory.stats.rooms[this.room.name].controllerLevel = this.level;
		return hasLevelChange;
	}
}
