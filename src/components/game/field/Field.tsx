import React, { useEffect, useState } from 'react'
import { useKeyPress } from '../hooks/useKeyPress'
import st from './field.module.css'

const Field = () => {
  const width = 20
  const height = 20

  const [field, setField] = useState<number[][]>(
    Array.from({ length: height }, () => Array<number>(width).fill(0))
  )

  useEffect(() => {
    updateField(2, 3, 1, setField,)
  }, [])

  const up: boolean = useKeyPress('ArrowUp')
  const down: boolean = useKeyPress('ArrowDown')
  const left: boolean = useKeyPress('ArrowLeft')
  const right: boolean = useKeyPress('ArrowRight')

  return (
    <div className={st['game']}>
      <div className={st['field']}>
        {/* {up && "U"}
        {down && 'D'}
        {left && 'L'}
        {right && 'R'} */}
        {displayField(field)}
      </div>
    </div>
  )
}

export default Field

function updateField(row: number, col: number, value: number,
  setField: React.Dispatch<React.SetStateAction<number[][]>>) {
  setField(prevField => {
    const newF = [...prevField]
    newF[row][col] = value
    return newF
  })
}

function displayField(field: number[][]): React.ReactNode {
  let result = field.map((rows, i) => (
    <ul className={st['ul-field']} key={'ul-' + i}>
      {rows.map((col, j) => (
        <li key={"li-" + j}>
          {getSymbol(rows[j], j)}
        </li>))}
    </ul>
  ))
  console.log(result);
  return result
}

function getSymbol(value: number, index: number) {
  return index % 2 == 0
    ? value == 0 ? ' ' : '['
    : value == 0 ? '.' : ']'
}
