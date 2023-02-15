import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useKeyPress } from './useKeyPress'
import { Pieces } from '../../../model/Pieces'

export default function useLoop() {
	const width = 10
	const height = 20
	const [field, setField] = useState<number[][]>(
		Array.from({ length: height }, () => Array<number>(width).fill(0)))
	const [current, setCurrent] = useState(new Array<{ row: number, col: number }>())
	const [direction, setDirection] = useState<string>("")

	const up: boolean = useKeyPress('ArrowUp')
	const down: boolean = useKeyPress('ArrowDown')
	const left: boolean = useKeyPress('ArrowLeft')
	const right: boolean = useKeyPress('ArrowRight')
	{/* {up && "U"} */ }

	useEffect(() => {
		fillCell(10, 5)
		addPiece(Pieces.J, 3)
	}, [])

	function addPiece(piece: number[][], startCol: number) {
		for (let i = 0; i < piece.length; i++) {
			const pieceRow = piece[i];
			for (let j = 0; j < pieceRow.length; j++) {
				updateCell(i, j + startCol, piece[i][j])
				if (piece[i][j] == 1) {
					let newOcc = current
					newOcc.push({ row: i, col: j + startCol })
					setCurrent(newOcc)
				}
			}
		}
	}

	useInterval(() => {
		movePieceDown()
	}, 1000)

	useInterval(() => {
		readInput()
		tryMovePiece()
	}, 100)

	function readInput() {
		let dir
			= up ? "u"
				: down ? "d"
					: left ? "l"
						: right ? "r"
							: ""
		setDirection(dir)
	}

	function tryMovePiece() {
		if (direction == "") return

		switch (direction) {
			case "u":
				console.log("u");
				break;
			case "d":
				console.log("d");
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

	function movePieceLeft() {
		let cur = current
		let mostLeftColIndex = Math.min(...cur.map(el => el.col))
		let mostLeftCol = cur.filter(({ row, col }) => col == mostLeftColIndex)
		let isWallReached = mostLeftCol.length == 0 || mostLeftCol[0].col == 0
		let smthOnLeft = isWallReached || mostLeftCol.some(({ row, col }) => field[row][col - 1] == 1)
		if (!smthOnLeft) {
			for (let j = 0; j < cur.length; j++) {
				const e = cur[j];
				cur[j] = { row: e.row, col: e.col - 1 }
				emptyCell(e.row, e.col)
			}
			updateField(cur, 1)
			setCurrent(cur)
		}
	}

	function movePieceRight() {
		let cur = current
		let mostRightColIndex = Math.max(...cur.map(el => el.col))
		let mostRightCol = cur.filter(({ row, col }) => col == mostRightColIndex)
		let isWallReached = mostRightCol.length == 0 || mostRightCol[0].col == width - 1
		let smthOnRight = isWallReached || mostRightCol.some(({ row, col }) => field[row][col + 1] == 1)
		if (!smthOnRight) {
			for (let j = 0; j < cur.length; j++) {
				const e = cur[j];
				cur[j] = { row: e.row, col: e.col + 1 }
				emptyCell(e.row, e.col)
			}
			updateField(cur, 1)
			setCurrent(cur)
		}
	}

	function movePieceDown() {
		let cur = current
		let lowestRowIndex = Math.max(...cur.map(el => el.row))
		let lowestRow = cur.filter(({ row, col }) => row == lowestRowIndex)
		let isBottomReached = lowestRow.length == 0 || lowestRow[0].row == height - 1
		let smthBelow = isBottomReached || lowestRow.some(({ row, col }) => field[row + 1][col] == 1)
		if (!smthBelow) {
			for (let i = 0; i < cur.length; i++) {
				let e = cur[i]
				cur[i] = { row: e.row + 1, col: e.col }
				emptyCell(e.row, e.col)
			}
			updateField(cur, 1)
			setCurrent(cur)
		} else {
			setCurrent(new Array<{ row: number, col: number }>())
		}
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

