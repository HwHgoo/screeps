module.exports = function(){
	_.assign(RoomPosition.prototype, extensions);
}

const extensions = {
	inRangeto : function(target, range){
		xRange = Math.abs(target.pos.x - this.x);
		yRange = Math.abs(target.pos.y - this.y);
		return xRange <= range && yRange <= range;
	}
}
