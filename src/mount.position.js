module.exports = function () {
	_.assign(RoomPosition.prototype, extensions);
}

const extensions = {
	inRangeto: function (target, range) {
		xRange = Math.abs(target.pos.x - this.x);
		yRange = Math.abs(target.pos.y - this.y);
		return xRange <= range && yRange <= range;
	},

	setConstructionSite(type) {
		const result = this.createConstructionSite(type);
		if (result != Ok) {
			console.log(`pos ${this} create site error, code ${result}`);
			return;
		}
		const room = Game.rooms[this.roomName];
		if (!room) {
			console.log(`${room.name} not under control`);
			return;
		}
		const sites = this.lookfor(LOOK_CONSTRUCTION_SITES);
		if (!sites || sites.length <= 0) {
			console.log(`pos-${pos} set site error`);
			return;
		}
		const site = sites[0];
		room.addBuildTask(site.id);
	}
}
