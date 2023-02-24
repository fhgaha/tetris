import React, { FC, useEffect, useState } from 'react'
import { PieceData } from '../../../model/PieceData'
import st from "./nextPiece.module.css";
import { drawTable } from '../../../utils/helpers';

const offset = 3

const NextPiece: FC<PieceData> = ({ pieceType, positions }): JSX.Element => {
  const [arr, setArr] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  useEffect(() => {
    let newArr = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    positions.forEach(p => {
      newArr[p.col - offset][p.row] = 1
    })
    setArr(newArr)
  }, [positions])

  return (
    <div className={st["next-piece"]}>
      <div>NEXT PIECE:</div>

      {/* <div>
        {positions.map((e, i) => (
          <div key={e.row + ' ' + e.col}>{e.row} {e.col}</div>
        ))}
      </div> */}

      <div className={st.piece}>
        {arr.map((rows, i) => (
          <ul key={'ul-' + i}>
            {rows.map((col, j) => (
              <li key={"li-" + j}>
                {rows[j] == 0 ? "  " : "[]"}
              </li>))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default NextPiece
