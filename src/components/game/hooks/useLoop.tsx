import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useKeyPress } from './useKeyPress'
import { Pieces } from '../../../model/Pieces'

export default function useLoop() {
	const width = 20
	const height = 20
	const [field, setField] = useState<number[][]>(
		Array.from({ length: height }, () => Array<number>(width).fill(0)))

	let currentPiece: number[][] = Array.from({ length: height }, () => Array<number>(width).fill(0))
	let direction: string = "";

	const up: boolean = useKeyPress('ArrowUp')
	const down: boolean = useKeyPress('ArrowDown')
	const left: boolean = useKeyPress('ArrowLeft')
	const right: boolean = useKeyPress('ArrowRight')
	{/* {up && "U"} */ }

	useEffect(() => {
		fillField(2, 2)
		fillField(2, 3)
	}, [])

	useInterval(() => {
		readInput()
		moveAllDown()
	}, 200)

	
// console.log(Pieces.I);


	function readInput() {
		direction
			= up ? "u"
				: down ? "d"
					: left ? "l"
						: right ? "r"
							: ""
	}

	function moveAllDown() {
		for (let i = 0; i < field.length - 1; i++) {
			const row = field[i]
			for (let j = 0; j < row.length; j++) {
				if (field[i][j] == 1 && field[i + 1][j] == 0) {
					moveDown(i, j)
				}
			}
		}
	}

	function moveDown(row: number, col: number) {
		fillField(row + 1, col)
		emptyField(row, col)
	}

	function fillField(row: number, col: number) {
		updateField(row, col, 1)
	}

	function emptyField(row: number, col: number) {
		updateField(row, col, 0)
	}

	function updateField(row: number, col: number, value: number) {
		setField(prevField => {
			const newF = [...prevField]
			newF[row][col] = value
			return newF
		})
	}

	return field
}



