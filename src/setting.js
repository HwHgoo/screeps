module.exports = {
	bodyConfigs: {
		harvester: [
			{work: 2, carry: 1, move: 1},
			{work: 4, carry: 1, move: 2},
			{work: 6, carry: 1, move: 3},
			{work: 8, carry: 2, move: 4},
			{work: 8, carry: 2, move: 4},
			{work: 8, carry: 2, move: 4},
			{work: 8, carry: 2, move: 4},
			{work: 8, carry: 2, move: 4}
		],
		builder: [
			{work: 1, carry: 1, move: 1},
			{work: 2, carry: 2, move: 2},
			{work: 3, carry: 3, move: 3},
			{work: 4, carry: 4, move: 4},
			{work: 6, carry: 6, move: 5},
			{work: 7, carry: 7, move: 7},
			{work: 12, carry: 6, move: 9},
			{work: 20, carry: 8, move: 14}
		],
		upgrader: [
			{work: 1, carry: 1, move: 1},
			{work: 2, carry: 2, move: 2},
			{work: 3, carry: 3, move: 3},
			{work: 4, carry: 4, move: 4},
			{work: 6, carry: 6, move: 6},
			{work: 9, carry: 9, move: 4},
			{work: 17, carry: 12, move: 9},
			{work: 12, carry: 12, move: 12}
		],
		filler: [
			{work: 1, carry: 1, move: 1},
			{work: 2, carry: 2, move: 2},
			{work: 3, carry: 3, move: 3},
			{work: 4, carry: 4, move: 4},
			{work: 6, carry: 6, move: 6},
			{work: 6, carry: 6, move: 6},
			{work: 6, carry: 6, move: 6},
			{work: 6, carry: 6, move: 6},
		]
	},

	baseLayout: {
		1: {
			[STRUCTURE_SPAWN]: [[-3, -2]]
		},

		2: {
			[STRUCTURE_EXTENSION]: [[-4, -3], [-3, -4], [-5, -4], [-5, -3], [-5, -2]]
		},

		3: {
			[STRUCTURE_EXTENSION]: [[-4, -5], [-3, -5], [-2, -5], [-1, -4], [-1, -3]],
			[STRUCTURE_TOWER]: [[-2, -1]],
			[STRUCTURE_ROAD]: [[-1, -2], [-1, -1], [-2, -2], [-3, -3], [-2, -4], [-4, -2], [-4, -4]]
		},

		4: {
			[STRUCTURE_EXTENSION]: [[-3, -1], [-4, -1], [-1, -4], [1, -3], [3, -4], [4, -3], [2, -5], [3, -5], [4, -5][5, -4]],
			[STRUCTURE_STORAGE]: [[0, -1]],
			[STRUCTURE_ROAD]: [[0, -3], [1, -2], [2, -2], [3, -3], [2, -4], [4, -4]],
			[STRUCTURE_RAMPART]: [[-3, -2], [0, -1], [-2, -1]]
		}
	}
}
















