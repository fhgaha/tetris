import { PieceTypes } from "./PieceTypes"

export type PieceData = {
	pieceType: PieceTypes,
	positions: {
		row: number,
		col: number
	}[]
}