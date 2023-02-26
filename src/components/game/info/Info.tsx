import React, { FC, useEffect, useState } from 'react'
import st from "./info.module.css";
import { useCountdown, useInterval } from 'usehooks-ts';

interface InfoProps {
	info: number,
	time: Date,
	score: number,
	level: number,
}

const Info: FC<InfoProps> = ({ info: fullLinesCounter, time: time, score: score, level: level }) => {
	return (
		<div className={st["info-container"]}>
			<div> FULL LINES: {fullLinesCounter}</div>
			<div> LEVEL: {level}</div>
			<div> SCORE: {score}</div>
			<div> TIME:
				{time.getUTCHours() > 0 ? (time.getUTCHours() + ':') : ' '}
				{time.getUTCMinutes() + ':'}
				{time.getUTCSeconds()}
			</div>
		</div>
	)
}

export default Info