import { PieceData } from "./PieceData"
import { PieceTypes } from "./PieceTypes"

export class Pieces {
	static O = {
		pieceType: PieceTypes.O,
		positions: [
			[1, 1],
			[1, 1]
		]
	}

	static T = {
		pieceType: PieceTypes.T,
		positions: [
			[1, 1, 1],
			[0, 1, 0]
		]
	}

	static T90 = {
		pieceType: PieceTypes.T90,
		positions: [
			[0, 1],
			[1, 1],
			[0, 1],
		]
	}

	static T180 = {
		pieceType: PieceTypes.T180,
		positions: [
			[0, 1, 0],
			[1, 1, 1],
		]
	}

	static T270 = {
		pieceType: PieceTypes.T270,
		positions: [
			[1, 0],
			[1, 1],
			[1, 0],
		]
	}

	static S = {
		pieceType: PieceTypes.S,
		positions: [
			[0, 1, 1],
			[1, 1, 0]
		]
	}

	static Z = {
		pieceType: PieceTypes.Z,
		positions: [
			[1, 1, 0],
			[0, 1, 1]
		]
	}

	static J = {
		pieceType: PieceTypes.J,
		positions: [
			[0, 0, 1],
			[1, 1, 1]
		]
	}

	static L = {
		pieceType: PieceTypes.L,
		positions: [
			[1, 0, 0],
			[1, 1, 1]
		]
	}

	static I = {
		pieceType: PieceTypes.I,
		positions: [
			[1, 1, 1, 1]
		]
	}

	static getRandom() {
		let n = Math.round(Math.random() * 6)
		switch (n) {
			case 0: return { pieceType: this.O.pieceType, positions: this.O.positions.toPositions(3) }
			case 1: return { pieceType: this.T.pieceType, positions: this.T.positions.toPositions(3) }
			case 2: return { pieceType: this.S.pieceType, positions: this.S.positions.toPositions(3) }
			case 3: return { pieceType: this.Z.pieceType, positions: this.Z.positions.toPositions(3) }
			case 4: return { pieceType: this.J.pieceType, positions: this.J.positions.toPositions(3) }
			case 5: return { pieceType: this.L.pieceType, positions: this.L.positions.toPositions(3) }
			default: return { pieceType: this.I.pieceType, positions: this.I.positions.toPositions(3) }
		}
	}


	static rotate(p: PieceData): PieceData {
		switch (p.pieceType) {
			case PieceTypes.T:
				return this.rotateT(p)
				break;

			default:
				return { pieceType: PieceTypes.I, positions: this.T.positions.toPositions(3) }
		}
	}

	static rotateT(p: PieceData): PieceData {
		let mostLeftColIndex = p.positions.reduce((prev, cur) => prev.col < cur.col ? prev : cur).col
		let topRowIndex = p.positions.reduce((prev, cur) => prev.row < cur.row ? prev : cur).row

		switch (p.pieceType) {
			case this.T.pieceType:
				return {
					pieceType: this.T90.pieceType,
					positions: this.T90.positions.toPositions(mostLeftColIndex, topRowIndex)
				}

			default:
				return { pieceType: PieceTypes.I, positions: this.T.positions.toPositions(3) }
		}
	}
}

