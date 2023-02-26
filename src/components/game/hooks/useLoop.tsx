import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useKeyPress } from './useKeyPress'
import { Pieces } from '../../../model/Pieces'
import '../../../model/ExtensionMethods'
import { PieceTypes } from '../../../model/PieceTypes'
import { PieceData } from '../../../model/PieceData'

const width = 10
const height = 20
const emptyField = Array.from({ length: height }, () => Array<number>(width).fill(0))
const emptyPositions = new Array<{ row: number, col: number }>()
const speedSlow = 500, speedFast = 100

export default function useLoop() {
	const [isPaused, setIsPaused] = useState(false)
	const [field, setField] = useState<number[][]>(emptyField)
	const [currentPiece, setCurrentPiece] = useState({ pieceType: PieceTypes.I, positions: emptyPositions })
	const [nextPiece, setNextPiece] = useState({ pieceType: PieceTypes.I, positions: emptyPositions })
	const [speed, setSpeed] = useState(500)
	const [fullLinesCounter, setFullLinesCounter] = useState(0)
	const [score, setScore] = useState(0)
	const [level, setLevel] = useState(1)

	//event.key
	useKeyPress('ArrowUp', () => rotatePiece())
	useKeyPress('ArrowDown', () => setSpeed(speedFast), () => setSpeed(speedSlow))
	useKeyPress('ArrowLeft', () => movePieceLeft())
	useKeyPress('ArrowRight', () => movePieceRight())
	useKeyPress(' ', () => setIsPaused(!isPaused))

	useEffect(() => {
		// fillCell(10, 5)
		addPiece(Pieces.getRandom(), 3)
		// addPiece({ pieceType: Pieces.L.pieceType, positions: Pieces.L.positions.toPositions(3) }, 0)
	}, [])

	function addPiece(piece: PieceData, startCol: number): void {
		setCurrentPiece(piece)
		let nextPiece = Pieces.getRandom()
		// let nextPiece = { pieceType: Pieces.I.pieceType, positions: Pieces.I.positions.toPositions(3) }
		setNextPiece(nextPiece)
	}

	useInterval(() => {
		movePieceDown(1)
	}, isPaused ? null : speed)

	function rotatePiece(): void {
		if (!canRotate()) return

		let rotated = Pieces.rotate(currentPiece)
		shiftAllLeftIfNeeded(rotated)
		updateField(currentPiece.positions, 0)
		setCurrentPiece(rotated)
	}

	function canRotate(): boolean {
		let rotated = Pieces.rotate(currentPiece)
		let someOfRotatedPositionsAlreadyOccupied
			= rotated.positions.some(rp =>
				rp.row >= height - 1 || isCellOccupied(rp.row, rp.col)
			)

		return !someOfRotatedPositionsAlreadyOccupied
	}

	function isCellOccupied(row: number, col: number): boolean {
		return field[row][col] == 1
			&& !currentPiece.positions.some(cpp => cpp.row == row && cpp.col == col)
	}

	function shiftAllLeftIfNeeded(piece: PieceData): void {
		let isRightBorderReached = piece.positions.some(({ col }) => col >= width)
		if (isRightBorderReached) {
			piece.positions.forEach(e => e.col--)
			shiftAllLeftIfNeeded(piece)
		}
	}

	function movePieceLeft(): void {
		let positions = currentPiece.positions
		let canMoveLeft = !positions.some(({ row, col }) =>
			col <= 0 || isCellOccupied(row, col - 1)
		)
		if (canMoveLeft) {
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
			checkFilledRow()
			addPiece(nextPiece, 0)
			// addPiece(Pieces.getRandom(), 3)
			// addPiece(Pieces.L, 3)
		}
	}

	function canMoveDown(positions: { row: any; col: any }[]): boolean {
		return !positions.some(({ row, col }) =>
			row >= height - 1 || isCellOccupied(row + 1, col)
		)
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

	function checkFilledRow() {
		let rowsToClear: number[] = []
		for (let i = 0; i < field.length; i++) {
			const row = field[i];
			if (row.every(n => n == 1)) {
				rowsToClear.push(i)
			}
		}

		if (rowsToClear.length > 0) {
			let newField = field.filter((row, i) => !rowsToClear.some(index => index == i))
			rowsToClear.forEach(r => { newField.unshift(new Array<number>(width).fill(0)) });
			setField(newField)
			setFullLinesCounter(fullLinesCounter + rowsToClear.length)
			let newScore = score + level * rowsToClear.length
			setScore(score + level * rowsToClear.length)
			setLevel(Math.floor(newScore / 10) + 1)
		}
	}

	return { field, nextPiece, fullLinesCounter, isPaused, score, level }
}

