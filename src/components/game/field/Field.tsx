import React, { FC, useEffect, useState } from 'react'
import { useKeyPress } from '../hooks/useKeyPress'
import st from './field.module.css'
import useLoop from '../hooks/useLoop'
import { drawTable } from '../../../utils/helpers'

interface FieldProps { field: number[][] }

const Field: FC<FieldProps> = ({ field }): JSX.Element => {
  return (
    <div className={st['game']}>
      <div className={st['field']}>
        {drawTable(field, st)}
      </div>
    </div>
  )
}

export default Field
