import React, { FC, useEffect, useState } from 'react'
import st from "./info.module.css";
import { useCountdown, useInterval } from 'usehooks-ts';

interface InfoProps {
	info: number,
	time: Date,
	isPaused: boolean,
	score: number,
	level: number,
}

const Info: FC<InfoProps> = ({ info: fullLinesCounter, time: time, isPaused: isPaused, score: score, level: level }) => {
	return (
		<div className={st["info-container"]}>
			<div> FULL LINES: {fullLinesCounter}</div>
			<div> LEVEL: {level}</div>
			<div> SCORE: {score}</div>
			<div> TIME:
				{time.getUTCHours() > 0 ? (time.getUTCHours().toString().padStart(2, '0') + ':') : ' '}
				{time.getUTCMinutes().toString().padStart(2, '0') + ':'}
				{time.getUTCSeconds().toString().padStart(2, '0')}
			</div>
			<br />
			<div>{isPaused ? 'GAME IS PAUSED' : ''}</div>
		</div>
	)
}

export default Info