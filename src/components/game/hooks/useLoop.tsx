import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useKeyPress } from './useKeyPress'
import { Pieces } from '../../../model/Pieces'

export default function useLoop() {
	const width = 10
	const height = 20
	const [field, setField] = useState<number[][]>(
		Array.from({ length: height }, () => Array<number>(width).fill(0)))
	const [occupied, setOccupied] = useState(new Array<{ row: number, col: number }>())
	let direction: string = ""

	const up: boolean = useKeyPress('ArrowUp')
	const down: boolean = useKeyPress('ArrowDown')
	const left: boolean = useKeyPress('ArrowLeft')
	const right: boolean = useKeyPress('ArrowRight')
	{/* {up && "U"} */ }

	useEffect(() => {
		// fillField(2, 2)
		// fillField(2, 3)
		fillCell(10, 5)
		addPiece(Pieces.J, 3)
	}, [])

	function addPiece(piece: number[][], startCol: number) {
		for (let i = 0; i < piece.length; i++) {
			const pieceRow = piece[i];
			for (let j = 0; j < pieceRow.length; j++) {
				updateCell(i, j + startCol, piece[i][j])
				if (piece[i][j] == 1) {
					let newOcc = occupied
					newOcc.push({ row: i, col: j + startCol })
					setOccupied(newOcc)
				}
			}
		}
	}

	useInterval(() => {
		readInput()
		tryMovePiece()
		moveAllDown()
	}, 1000)

	function readInput() {
		direction
			= up ? "u"
				: down ? "d"
					: left ? "l"
						: right ? "r"
							: ""
	}

	function tryMovePiece() {

	}

	function moveAllDown() {
		let tempOcc = occupied
		let lowestRowIndex = getLowestRowIndex(tempOcc)
		let lowestRow = tempOcc.filter(({ row, col }) => row == lowestRowIndex)
		let filledBelow = lowestRow.some(({ row, col }) => field[row + 1][col] == 1)
		if (!filledBelow) {
			for (let i = 0; i < tempOcc.length; i++) {
				let e = tempOcc[i]
				tempOcc[i] = { row: e.row + 1, col: e.col }
				emptyCell(e.row, e.col)
			}
		}
		updateField(tempOcc, 1)
		setOccupied(tempOcc)
	}

	function isEmptyBelow(
		occupied: { row: number, col: number }[],
		field: number[][],
		i: number, j: number
	): boolean {
		let lowestRowIndex = getLowestRowIndex(occupied)
		let lowestRow = occupied.filter(({ row, col }) => row == lowestRowIndex)
		if (!lowestRow.some(({ row, col }) => row == i && col == j)) {
			return true
		}
		let isEmptyBelow = lowestRow.every(({ row, col }) => field[row + 1][col] == 0)
		return isEmptyBelow
	}

	function getLowestRowIndex(array: { row: number; col: number }[]): number {
		let lowestRowIndex = 0
		for (let i = 0; i < array.length; i++) {
			const element = array[i]
			if (element.row > lowestRowIndex) {
				lowestRowIndex = element.row
			}
		}
		return lowestRowIndex
	}

	function moveCellDown(row: number, col: number): void {
		fillCell(row + 1, col)
		emptyCell(row, col)
	}

	function fillCell(row: number, col: number): void {
		updateCell(row, col, 1)
	}

	function emptyCell(row: number, col: number) {
		updateCell(row, col, 0)
	}

	function updateCell(row: number, col: number, value: number) {
		setField(() => {
			const newF = [...field]
			newF[row][col] = value
			return newF
		})
	}

	function updateField(array: { row: number, col: number }[], value: number) {
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
