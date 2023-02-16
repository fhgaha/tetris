import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useKeyPress } from './useKeyPress'
import { Pieces } from '../../../model/Pieces'

export default function useLoop() {
	const width = 10
	const height = 20
	const [field, setField] = useState<number[][]>(
		Array.from({ length: height }, () => Array<number>(width).fill(0)))
	const [currentPiece, setCurrentPiece] = useState(new Array<{ row: number, col: number }>())
	const [nextPiece, setNextPiece] = useState(new Array<{ row: number, col: number }>())
	const [direction, setDirection] = useState<string>("")

	const up: boolean = useKeyPress('ArrowUp')
	const down: boolean = useKeyPress('ArrowDown')
	const left: boolean = useKeyPress('ArrowLeft')
	const right: boolean = useKeyPress('ArrowRight')

	useEffect(() => {
		// fillCell(10, 5)
		// addPiece(Pieces.getRandom(), 3)
		addPiece(Pieces.L, 3)
		let nextPositions = pieceToPositions(Pieces.getRandom(), 3)
		setNextPiece(nextPositions)
	}, [])

	function addPiece(piece: number[][], startCol: number) {
		let newPositions = pieceToPositions(piece, startCol)
		setCurrentPiece(newPositions)
		if (nextPiece.length == 0) {
			let newNextPositions = pieceToPositions(Pieces.getRandom(), startCol)
			setNextPiece(newNextPositions)
		}
	}

	useInterval(() => {
		movePieceDown(1)
	}, 500)

	useInterval(() => {
		readInput()
		MovePiece()
	}, 100)

	function pieceToPositions(piece: number[][], startCol: number) {
		let newPositions = new Array<{ row: number; col: number }>()

		for (let i = 0; i < piece.length; i++) {
			const pieceRow = piece[i]
			for (let j = 0; j < pieceRow.length; j++) {
				if (piece[i][j] == 1) {
					newPositions.push({ row: i, col: j + startCol })
				}
			}
		}
		return newPositions
	}

	function readInput() {
		let dir
			= up ? "u"
				: down ? "d"
					: left ? "l"
						: right ? "r"
							: ""
		setDirection(dir)
	}

	function MovePiece() {
		switch (direction) {
			case "u":
				rotatePiece()
				break;
			case "d":
				movePieceDown(2)
				break;
			case "l":
				movePieceLeft()
				break;
			case "r":
				movePieceRight()
				break;
			default:
				break;
		}
	}

	function rotatePiece() {

	}

	function movePieceLeft(): void {
		let cur = currentPiece
		let mostLeftColIndex = Math.min(...cur.map(el => el.col))
		let mostLeftCol = cur.filter(({ row, col }) => col == mostLeftColIndex)
		let isWallReached = mostLeftCol.length == 0 || mostLeftCol[0].col == 0
		let cellToLeftIsTaken = mostLeftCol.some(({ row, col }) => field[row][col - 1] == 1)
		let smthOnLeft = isWallReached || cellToLeftIsTaken
		if (!smthOnLeft) {
			for (let j = 0; j < cur.length; j++) {
				const e = cur[j];
				cur[j] = { row: e.row, col: e.col - 1 }
				emptyCell(e.row, e.col)
			}
			updateField(cur, 1)
			setCurrentPiece(cur)
		}
	}

	function movePieceRight(): void {
		let cur = currentPiece
		let mostRightColIndex = Math.max(...cur.map(el => el.col))
		let mostRightCol = cur.filter(({ row, col }) => col == mostRightColIndex)
		let isWallReached = mostRightCol.length == 0 || mostRightCol[0].col == width - 1
		let cellToRightIsTaken = mostRightCol.some(({ row, col }) => field[row][col + 1] == 1)
		let smthOnRight = isWallReached || cellToRightIsTaken
		if (!smthOnRight) {
			for (let j = 0; j < cur.length; j++) {
				const e = cur[j];
				cur[j] = { row: e.row, col: e.col + 1 }
				emptyCell(e.row, e.col)
			}
			updateField(cur, 1)
			setCurrentPiece(cur)
		}
	}

	function movePieceDown(amount: number): void {
		let cur = currentPiece
		if (canMoveDown(cur)) {
			for (let i = 0; i < cur.length; i++) {
				let e = cur[i]
				cur[i] = {
					row: e.row + Math.min(amount, height - 1 - e.row),
					col: e.col
				}
				emptyCell(e.row, e.col)
			}
			updateField(cur, 1)
			setCurrentPiece(cur)
		} else {
			addPiece(Pieces.getRandom(), 3)
		}
	}

	function canMoveDown(positions: { row: any; col: any }[]) {
		let lowestRowIndex = Math.max(...positions.map((el: { row: any }) => el.row))
		let lowestRow = positions.filter(({ row, col }) => row == lowestRowIndex)
		let isBottomReached = lowestRow.length == 0 || lowestRow[0].row == height - 1
		let nextCellIsTakenAndDoesNotBelongToCur
			= positions.some(
				({ row, col }) => cellBelowIsOccupied(row, col) && !someCellsBelowBelongToCur(row, col)
			)
		return !(isBottomReached || nextCellIsTakenAndDoesNotBelongToCur)

		function cellBelowIsOccupied(row: number, col: number): boolean {
			return row != height - 1 && field[row + 1][col] == 1
		}
		function someCellsBelowBelongToCur(row: number, col: number): boolean {
			return positions.some(e => e.row == row + 1 && e.col == col)
		}
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

