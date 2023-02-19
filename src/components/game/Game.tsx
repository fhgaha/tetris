import { PieceTypes } from "../../model/PieceTypes"
import Field from "./field/Field"
import useLoop from "./hooks/useLoop"
import Info from "./info/Info"
import NextPiece from "./nextPiece/NextPiece"

const Game = () => {
	const { field, nextPiece, fullLinesCounter } = useLoop()

	return (
		<>
			<Info fullLinesCounter={fullLinesCounter}/>
			<Field field={field} />
			<NextPiece {...nextPiece} />
		</>
	)
}

export default Game