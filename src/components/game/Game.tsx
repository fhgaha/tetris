import React, { useEffect, useState } from 'react'
import { useKeyPress } from '../../hooks/useKeyPress'
import st from './game.module.css'

const Game = () => {
  const width = 10
  const height = 20

  const [field, setField] = useState<number[][]>(
    // new Array(height).fill(0).map(() => new Array(width).fill(0))
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
        {display2DArrayAsTable(field)}
      </div>
    </div>
  )
}

export default Game

function updateField(row: number, col: number, value: number,
  setField: React.Dispatch<React.SetStateAction<number[][]>>) {
  setField(prevField => {
    const newF = [...prevField]
    newF[row][col] = value
    return newF
  })
}

function display2DArrayAsTable(field: number[][]): React.ReactNode {
  let result = field.map((rows, i) => {
    return (
      <ul className={st['ul-field']} key={'ul-' + i}>
        {rows.map((col, j) => {
          return (
            <li key={"li-" + j}>
              {rows[j] == 0 ? '.' : '*'}
            </li>)
        })}
      </ul>
    )
  })
  console.log(result);
  return result

}
