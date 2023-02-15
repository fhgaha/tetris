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
		addPiece(Pieces.J, 3)
	}, [])

	function addPiece(piece: number[][], startCol: number) {
		for (let i = 0; i < piece.length; i++) {
			const pieceRow = piece[i];
			for (let j = 0; j < pieceRow.length; j++) {
				updateField(i, j + startCol, piece[i][j])
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

		for (let i = field.length - 2; i >= 0; i--) {
			const _row = field[i]
			for (let j = 0; j < _row.length; j++) {
				let cellIsOccupied = occupied.find(({ row, col }) => (row == i && col == j)) != undefined
				if (
					// field[i][j] == 1 && field[i + 1][j] == 0
					cellIsOccupied
				) {
					moveCellDown(i, j)

					let newOcc = tempOcc.filter(({ row, col }) => !(row == i && col == j))
					newOcc.push({ row: i + 1, col: j })
					tempOcc = newOcc
				}
			}
		}
		setOccupied(tempOcc)
	}

	function moveRowDown() {
		for (let i = 0; i < field.length; i++) {
			const row = field[i];

		}
	}

	function moveCellDown(row: number, col: number): void {
		fillCell(row + 1, col)
		emptyCell(row, col)
	}

	function fillCell(row: number, col: number): void {
		updateField(row, col, 1)
	}

	function emptyCell(row: number, col: number) {
		updateField(row, col, 0)
	}

	function updateField(row: number, col: number, value: number) {
		setField(() => {
			const newF = [...field]
			newF[row][col] = value
			return newF
		})
	}

	return field
}
