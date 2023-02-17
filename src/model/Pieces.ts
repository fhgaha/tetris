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
			[1, 1, 0],
		]
	}

	static S90 = {
		pieceType: PieceTypes.S90,
		positions: [
			[1, 0],
			[1, 1],
			[0, 1]
		]
	}

	static Z = {
		pieceType: PieceTypes.Z,
		positions: [
			[1, 1, 0],
			[0, 1, 1]
		]
	}

	static Z90 = {
		pieceType: PieceTypes.Z90,
		positions: [
			[0, 1],
			[1, 1],
			[1, 0],
		]
	}

	static J = {
		pieceType: PieceTypes.J,
		positions: [
			[0, 0, 1],
			[1, 1, 1]
		]
	}

	static J90 = {
		pieceType: PieceTypes.J90,
		positions: [
			[1, 0],
			[1, 0],
			[1, 1]
		]
	}

	static J180 = {
		pieceType: PieceTypes.J180,
		positions: [
			[1, 1, 1],
			[1, 0, 0]
		]
	}

	static J270 = {
		pieceType: PieceTypes.J270,
		positions: [
			[1, 1],
			[0, 1],
			[0, 1]
		]
	}

	static L = {
		pieceType: PieceTypes.L,
		positions: [
			[1, 0, 0],
			[1, 1, 1]
		]
	}

	static L90 = {
		pieceType: PieceTypes.L90,
		positions: [
			[1, 1],
			[1, 0],
			[1, 0]
		]
	}

	static L180 = {
		pieceType: PieceTypes.L180,
		positions: [
			[1, 1, 1],
			[0, 0, 1]
		]
	}

	static L270 = {
		pieceType: PieceTypes.L270,
		positions: [
			[0, 1],
			[0, 1],
			[1, 1]
		]
	}

	static I = {
		pieceType: PieceTypes.I,
		positions: [
			[1, 1, 1, 1]
		]
	}

	static I90 = {
		pieceType: PieceTypes.I90,
		positions: [
			[1],
			[1],
			[1],
			[1]
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
			case PieceTypes.O:
				return p
			case PieceTypes.T:
			case PieceTypes.T90:
			case PieceTypes.T180:
			case PieceTypes.T270:
				return this.rotateT(p)
			case PieceTypes.S:
			case PieceTypes.S90:
				return this.rotateS(p)
			case PieceTypes.Z:
			case PieceTypes.Z90:
				return this.rotateZ(p)
			case PieceTypes.J:
			case PieceTypes.J90:
			case PieceTypes.J180:
			case PieceTypes.J270:
				return this.rotateJ(p)
			case PieceTypes.L:
			case PieceTypes.L90:
			case PieceTypes.L180:
			case PieceTypes.L270:
				return this.rotateL(p)
			case PieceTypes.I:
			case PieceTypes.I90:
				return this.rotateI(p)
			default:
				throw new Error("Unknown piece type: " + p.pieceType);
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
			case this.T90.pieceType:
				return {
					pieceType: this.T180.pieceType,
					positions: this.T180.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.T180.pieceType:
				return {
					pieceType: this.T270.pieceType,
					positions: this.T270.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.T270.pieceType:
				return {
					pieceType: this.T.pieceType,
					positions: this.T.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			default: throw new Error("Unknown piece type")
		}
	}

	static rotateS(p: PieceData): PieceData {
		let mostLeftColIndex = p.positions.reduce((prev, cur) => prev.col < cur.col ? prev : cur).col
		let topRowIndex = p.positions.reduce((prev, cur) => prev.row < cur.row ? prev : cur).row

		switch (p.pieceType) {
			case this.S.pieceType:
				return {
					pieceType: this.S90.pieceType,
					positions: this.S90.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.S90.pieceType:
				return {
					pieceType: this.S.pieceType,
					positions: this.S.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			default: throw new Error("Unknown piece type")
		}
	}

	static rotateZ(p: PieceData): PieceData {
		let mostLeftColIndex = p.positions.reduce((prev, cur) => prev.col < cur.col ? prev : cur).col
		let topRowIndex = p.positions.reduce((prev, cur) => prev.row < cur.row ? prev : cur).row

		switch (p.pieceType) {
			case this.Z.pieceType:
				return {
					pieceType: this.Z90.pieceType,
					positions: this.Z90.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.Z90.pieceType:
				return {
					pieceType: this.Z.pieceType,
					positions: this.Z.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			default: throw new Error("Unknown piece type")
		}
	}

	static rotateJ(p: PieceData): PieceData {
		let mostLeftColIndex = p.positions.reduce((prev, cur) => prev.col < cur.col ? prev : cur).col
		let topRowIndex = p.positions.reduce((prev, cur) => prev.row < cur.row ? prev : cur).row

		switch (p.pieceType) {
			case this.J.pieceType:
				return {
					pieceType: this.J90.pieceType,
					positions: this.J90.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.J90.pieceType:
				return {
					pieceType: this.J180.pieceType,
					positions: this.J180.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.J180.pieceType:
				return {
					pieceType: this.J270.pieceType,
					positions: this.J270.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.J270.pieceType:
				return {
					pieceType: this.J.pieceType,
					positions: this.J.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			default: throw new Error("Unknown piece type")
		}
	}

	static rotateL(p: PieceData): PieceData {
		let mostLeftColIndex = p.positions.reduce((prev, cur) => prev.col < cur.col ? prev : cur).col
		let topRowIndex = p.positions.reduce((prev, cur) => prev.row < cur.row ? prev : cur).row

		switch (p.pieceType) {
			case this.L.pieceType:
				return {
					pieceType: this.L90.pieceType,
					positions: this.L90.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.L90.pieceType:
				return {
					pieceType: this.L180.pieceType,
					positions: this.L180.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.L180.pieceType:
				return {
					pieceType: this.L270.pieceType,
					positions: this.L270.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.L270.pieceType:
				return {
					pieceType: this.L.pieceType,
					positions: this.L.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			default: throw new Error("Unknown piece type")
		}
	}

	static rotateI(p: PieceData): PieceData {
		let mostLeftColIndex = p.positions.reduce((prev, cur) => prev.col < cur.col ? prev : cur).col
		let topRowIndex = p.positions.reduce((prev, cur) => prev.row < cur.row ? prev : cur).row

		switch (p.pieceType) {
			case this.I.pieceType:
				return {
					pieceType: this.I90.pieceType,
					positions: this.I90.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			case this.I90.pieceType:
				return {
					pieceType: this.I.pieceType,
					positions: this.I.positions.toPositions(mostLeftColIndex, topRowIndex)
				}
			default: throw new Error("Unknown piece type")
		}
	}
}


