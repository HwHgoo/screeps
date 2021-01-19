const ROOM_MAX_SIZE = 50;

module.exports = (roomName, baseSize) => {
	const terrian = new Room.Terrain(roomName);
	let dp = new Array(ROOM_MAX_SIZE).fill(undefined).map(_ => []);
	let result = [];
	let minSwamp = Infinity;
	for (let i = 0; i < ROOM_MAX_SIZE; i++) {
		for (let j = 0; j < ROOM_MAX_SIZE; j++) {
			const {top, left, topLeft} = getOtherArea(dp, i, j, 1);
			dp[i][j] = {
				len: terrian.get(i, j) == TERRAIN_MASK_WALL ? 0 : (Math.min(top.len, left.len, topLeft.len) + 1),
				swamp: terrian.get(i, j) == (TERRAIN_MASK_SWAMP ? 1 : 0) + top.swamp + left.swamp + topLeft.swamp
			}

			if (dp[i][j].len >= baseSize) {

			}

		}
	}
}

function getOtherArea(dp, i, j, len) {
	const nullNode = {len: 0, swamp: 0};
	return {
		top: (i - len > -1) ? dp[i - len][j] : nullNode,
		left: (j - len > -1) ? dp[i][j - len] : nullNode,
		topLeft: (i - len > -1 && j - len > -1) ? dp[i - len][j - len] : nullNode
	}
}
