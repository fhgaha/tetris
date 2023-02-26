import React from 'react'
import st from "./titleScreen.module.css";

interface ButtonProps {
	onStartPressed: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

const TitleScreen = ({onStartPressed}: ButtonProps) => {
	return (
		<div className={st['title-screen']}>
			<div className={st.title}>
				<p>*********************************************************</p>
				<h1>RETRO TETRIS</h1>
				<p>*********************************************************</p>
			</div>
			<button type='button' onClick={onStartPressed}>START</button>
		</div>
	)
}

export default TitleScreen