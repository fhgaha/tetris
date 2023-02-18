import React, { FC } from 'react'
import { PieceData } from '../../../model/PieceData'

const NextPiece: FC<PieceData> = ({ pieceType, positions }): JSX.Element => {
  return (
    <>
      <div>NEXT PIECE:</div>
      {positions.map((e, i) => (
        <div>{e.row} {e.col}</div>
      ))}
    </>
  )
}

export default NextPiece