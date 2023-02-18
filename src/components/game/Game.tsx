import { PieceTypes } from "../../model/PieceTypes"
import Field from "./field/Field"
import useLoop from "./hooks/useLoop"
import Info from "./info/Info"
import NextPiece from "./nextPiece/NextPiece"

const Game = () => {
	const { field, nextPiece } = useLoop()

	return (
		<>
			<Info />
			<Field field={field} />
			<NextPiece {...nextPiece} />
		</>
	)
}

export default Game