import React from 'react'
import st from "./info.module.css";

const Info = () => {
	return (
		<div className={st["info-container"]}>
			<div> FULL LINES: 1</div>
			<div> LEVEL: 1</div>
			<div> SCORE: 69</div>
			<div> TIME: 2:40</div>
		</div>
	)
}

export default Info