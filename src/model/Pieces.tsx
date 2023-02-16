export class Pieces {
	static O: number[][] = [
		[1, 1],
		[1, 1]
	]

	static T: number[][] = [
		[1, 1, 1],
		[0, 1, 0]
	]

	static S: number[][] = [
		[0, 1, 1],
		[1, 1, 0]
	]

	static Z: number[][] = [
		[1, 1, 0],
		[0, 1, 1]
	]

	static J: number[][] = [
		[0, 0, 1],
		[1, 1, 1]
	]

	static L: number[][] = [
		[1, 0, 0],
		[1, 1, 1]
	]

	static I: number[][] = [
		[1, 1, 1, 1]
	]

	static getRandom(): number[][] {
		let n = Math.round(Math.random() * 6)
		switch (n) {
			case 0: return this.O
			case 1: return this.T
			case 2: return this.S
			case 3: return this.Z
			case 4: return this.J
			case 5: return this.L
			default: return this.I
		}
	}
}

export enum PieceTypes {
	O, T, S, Z, J, K, L
}