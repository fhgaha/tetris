import React, { FC, useEffect, useState } from 'react'
import { useKeyPress } from '../hooks/useKeyPress'
import st from './field.module.css'
import useLoop from '../hooks/useLoop'

interface FieldProps { field: number[][] }

const Field: FC<FieldProps> = ({ field }): JSX.Element => {
  return (
    <div className={st['game']}>
      <div className={st['field']}>
        {draw(field)}
      </div>
    </div>
  )
}

export default Field

function draw(field: number[][]): React.ReactNode {
  let result = field.map((rows, i) => (
    <ul className={st['ul-field']} key={'ul-' + i}>
      {rows.map((col, j) => (
        <li key={"li-" + j}>
          {
            rows[j] == 0 ? " ." : "[]"
            // rows[j]
          }
        </li>))}
    </ul>
  ))
  return result
}
