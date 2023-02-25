import { PieceTypes } from "./PIeceTypesAAAAAAAA"

export type PieceData = {
	pieceType: PieceTypes,
	positions: {
		row: number,
		col: number
	}[]
}