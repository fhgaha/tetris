export function drawTable(field: number[][], st: { readonly [key: string]: string; }): React.ReactNode {
	let result = field.map((rows, i) => (
		<ul
			className={st['ul-field']}
			key={'ul-' + i}>
			{rows.map((col, j) => (
				<li key={"li-" + j}>
					{
						rows[j] == 0 ? " ." : "[]"
					}
				</li>))}
		</ul>
	))
	return result
}
