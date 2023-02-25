import { useState } from "react"
import { PieceTypes } from "../../model/PIeceTypesAAAAAAAA"
import Field from "./field/Field"
import useLoop from "./hooks/useLoop"
import Info from "./info/Info"
import NextPiece from "./nextPiece/NextPiece"
import { useInterval } from "usehooks-ts"
import st from "./game.module.css";

const Game = () => {
	const { field, nextPiece, fullLinesCounter, isPaused } = useLoop()
	const [time, setTime] = useState(new Date(0))

	useInterval(() => {
		if (!isPaused) {
			let newTime = time
			newTime.setUTCSeconds(time.getSeconds() + 1)
			setTime(newTime)
		}
	}, 1000)

	return (
		<div className={st.game}>
			<Info info={fullLinesCounter} time={time} />
			<Field field={field} />
			<NextPiece {...nextPiece} />
		</div>
	)
}

export default Game