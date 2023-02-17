declare global {
	interface Array<T extends number[]> {
		toPositions(startCol: number, startRow?: number): { row: number; col: number }[];
	}
}

Array.prototype.toPositions =
	function (startCol: number, startRow: number = 0): { row: number; col: number }[] {
		let newPositions = new Array<{ row: number; col: number }>()

		for (let i = 0; i < this.length; i++) {
			const pieceRow = this[i]
			for (let j = 0; j < pieceRow.length; j++) {
				if (this[i][j] == 1) {
					newPositions.push({ row: i + startRow, col: j + startCol })
				}
			}
		}
		return newPositions
	}

export { }
