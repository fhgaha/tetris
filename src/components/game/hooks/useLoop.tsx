import React, { useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

export default function useLoop() {
	const width = 20
	const height = 20

	const [field, setField] = useState<number[][]>(
		Array.from({ length: height }, () => Array<number>(width).fill(0))
	)

	useEffect(() => {
		fillField(2, 2, setField)
		fillField(2, 3, setField)
	}, [])

	useInterval(() => {
		for (let i = 0; i < field.length - 1; i++) {
			const row = field[i]
			for (let j = 0; j < row.length; j++) {
				if (field[i][j] == 1 && field[i + 1][j] == 0) {
					fillField(i + 1, j, setField)
					emptyField(i, j, setField)
				}

			}
		}
	}, 1000)

	return field
}

function fillField(row: number, col: number,
	setField: React.Dispatch<React.SetStateAction<number[][]>>) {
	updateField(row, col, 1, setField)
}

function emptyField(row: number, col: number,
	setField: React.Dispatch<React.SetStateAction<number[][]>>) {
	updateField(row, col, 0, setField)
}

function updateField(row: number, col: number, value: number,
	setField: React.Dispatch<React.SetStateAction<number[][]>>) {
	setField(prevField => {
		const newF = [...prevField]
		newF[row][col] = value
		return newF
	})
}
