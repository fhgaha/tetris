import React, { FC, useEffect, useState } from 'react'
import st from "./info.module.css";
import { useCountdown, useInterval } from 'usehooks-ts';

interface InfoProps { fullLinesCounter: number }

const Info: FC<InfoProps> = ({ fullLinesCounter }) => {
	const [count, setCount] = useState(new Date(1000000))

	useInterval(() => {
		let newDate = count
		newDate.setUTCSeconds(count.getSeconds() + 1)
		setCount(newDate)
	}, 1000)

	return (
		<div className={st["info-container"]}>
			<div> FULL LINES: {fullLinesCounter}</div>
			<div> LEVEL: 1</div>
			<div> SCORE: 69</div>
			<div> TIME:
				{count.getUTCHours() > 0 ? (count.getUTCHours() + ':') : ' '}
				{count.getUTCMinutes() + ':'}
				{count.getUTCSeconds()}
			</div>
		</div>
	)
}

export default Info