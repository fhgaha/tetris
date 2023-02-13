import React, { useState } from 'react'
import { useKeyPress } from '../../hooks/useKeyPress'
import st from './game.module.css'

const Game = () => {
  const width = 10
  const height = 20

  const [field, setField] = useState(
    new Array(height).fill(0)
      .map(() => new Array(width).fill(0))
  )
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

function display2DArrayAsTable(field: any[][]): React.ReactNode {
  return field.map((rows, i) => {
    return <ul className={st['ul-field']} key={'ul-' + i}>
      {rows.map((cols, j) => {
        return <li key={"li-" + j}>
          {cols}
        </li>
      })}
    </ul>
  })
}
