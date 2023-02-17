import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useKeyPress } from './useKeyPress'
import { Pieces } from '../../../model/Pieces'
import '../../../model/ExtensionMethods'
import { PieceTypes } from '../../../model/PieceTypes'
import { PieceData } from '../../../model/PieceData'
import { wait } from '@testing-library/user-event/dist/utils'

const width = 10
const height = 20
const emptyField = Array.from({ length: height }, () => Array<number>(width).fill(0))
const emptyPositions = new Array<{ row: number, col: number }>()

export default function useLoop() {
	const [field, setField] = useState<number[][]>(emptyField)
	const [currentPiece, setCurrentPiece] = useState({ pieceType: PieceTypes.I, positions: emptyPositions })
	const [nextPiece, setNextPiece] = useState({ pieceType: PieceTypes.I, positions: emptyPositions })

	const up: boolean = useKeyPress('ArrowUp', () => rotatePiece())
	const down: boolean = useKeyPress('ArrowDown', () => movePieceDown(1))
	const left: boolean = useKeyPress('ArrowLeft', () => movePieceLeft())
	const right: boolean = useKeyPress('ArrowRight', () => movePieceRight())

	useEffect(() => {
		// fillCell(10, 5)
		// addPiece(Pieces.getRandom(), 3)
		addPiece({ pieceType: Pieces.I.pieceType, positions: Pieces.I.positions.toPositions(3) }, 0)
		let nextPositions = Pieces.getRandom()
		setNextPiece(nextPositions)
	}, [])

	function addPiece(piece: PieceData, startCol: number): void {
		let newPositions = piece.positions.toPositions(startCol)
		setCurrentPiece(piece)
		if (nextPiece.positions.length == 0) {
			let newNextPositions = Pieces.getRandom()
			setNextPiece(newNextPositions)
		}
	}

	useInterval(() => {
		movePieceDown(1)
	}, 500)

	function rotatePiece() {
		let rotated = Pieces.rotate(currentPiece)
		updateField(currentPiece.positions, 0)
		setCurrentPiece(rotated)
	}

	function movePieceLeft(): void {
		let positions = currentPiece.positions
		let mostLeftColIndex = Math.min(...positions.map(el => el.col))
		let mostLeftCol = positions.filter(({ row, col }) => col == mostLeftColIndex)
		let isWallReached = mostLeftCol.length == 0 || mostLeftCol[0].col == 0
		let cellToLeftIsTaken = mostLeftCol.some(({ row, col }) => field[row][col - 1] == 1)
		let smthOnLeft = isWallReached || cellToLeftIsTaken
		if (!smthOnLeft) {
			for (let j = 0; j < positions.length; j++) {
				const e = positions[j];
				positions[j] = { row: e.row, col: e.col - 1 }
				emptyCell(e.row, e.col)
			}
			updateField(positions, 1)
			setCurrentPiece({ ...currentPiece, positions: positions })
		}
	}

	function movePieceRight(): void {
		let positions = currentPiece.positions
		let mostRightColIndex = Math.max(...positions.map(el => el.col))
		let mostRightCol = positions.filter(({ row, col }) => col == mostRightColIndex)
		let isWallReached = mostRightCol.length == 0 || mostRightCol[0].col == width - 1
		let cellToRightIsTaken = mostRightCol.some(({ row, col }) => field[row][col + 1] == 1)
		let smthOnRight = isWallReached || cellToRightIsTaken
		if (!smthOnRight) {
			for (let j = 0; j < positions.length; j++) {
				const e = positions[j];
				positions[j] = { row: e.row, col: e.col + 1 }
				emptyCell(e.row, e.col)
			}
			updateField(positions, 1)
			setCurrentPiece({ ...currentPiece, positions: positions })
		}
	}

	function movePieceDown(amount: number): void {
		let positions = currentPiece.positions
		if (canMoveDown(positions)) {
			for (let i = 0; i < positions.length; i++) {
				let e = positions[i]
				positions[i] = {
					row: e.row + Math.min(amount, height - 1 - e.row),
					col: e.col
				}
				emptyCell(e.row, e.col)
			}
			updateField(positions, 1)
			setCurrentPiece({ ...currentPiece, positions: positions })
		} else {
			addPiece(Pieces.getRandom(), 3)
			// addPiece(Pieces.L, 3)
		}
	}

	function resetCurrent() {
		setCurrentPiece({ pieceType: PieceTypes.I, positions: emptyPositions })
	}

	function canMoveDown(positions: { row: any; col: any }[]): boolean {
		let lowestRowIndex = Math.max(...positions.map((el: { row: any }) => el.row))
		let lowestRow = positions.filter(({ row, col }) => row == lowestRowIndex)
		let isBottomReached = lowestRow.length == 0 || lowestRow[0].row == height - 1
		let nextCellIsTakenAndDoesNotBelongToCur
			= positions.some(({ row, col }) =>
				cellBelowIsOccupied(row, col) && !someCellsBelowBelongToPositions(row, col))
		return !(isBottomReached || nextCellIsTakenAndDoesNotBelongToCur)

		function someCellsBelowBelongToPositions(row: number, col: number): boolean {
			return positions.some(e => e.row == row + 1 && e.col == col)
		}
	}

	function cellBelowIsOccupied(row: number, col: number): boolean {
		return row != height - 1 && field[row + 1][col] == 1
	}

	function fillCell(row: number, col: number): void {
		updateCell(row, col, 1)
	}

	function emptyCell(row: number, col: number): void {
		updateCell(row, col, 0)
	}

	function updateCell(row: number, col: number, value: number): void {
		setField(() => {
			const newF = [...field]
			newF[row][col] = value
			return newF
		})
	}

	function updateField(array: { row: number, col: number }[], value: number): void {
		setField(() => {
			const newF = [...field]
			array.forEach(e => {
				newF[e.row][e.col] = value
			});
			return newF
		})
	}

	return field
}


