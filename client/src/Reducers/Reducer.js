import ActionTypes from "../Actions/ActionTypes";

const evaluateIndex = (row,col,gameState) => {
	let value = gameState[row][col]
	
	//left-diagonal 
	if (row === col){
		console.log("left diagonal")
		let compareArr = [
			gameState[0][0],
			gameState[1][1],
			gameState[2][2],
		]
		compareArr = compareArr.map( el => (el === value))
		if(compareArr.indexOf(false) === -1){
			return true
		}
	}
	// right-diagonal
	if(row + col === 2){
		console.log("right diagonal")
		let compareArr = [
			gameState[0][2],
			gameState[1][1],
			gameState[2][0],
		]
		compareArr = compareArr.map( el => (el === value))
		if(compareArr.indexOf(false) === -1){
			return true
		}
	}

	//row-traverse
	console.log("row traverse")
	var isRowMatch = true
	for(var i=0;i<3;i++){
		if(gameState[row][i] !== value){
			isRowMatch = false
			break
		}
	}

	if(isRowMatch){
		return true
	}
	//col-traverse
	console.log("col traverse")
	var isColMatch = true
	for(var i=0;i<3;i++){
		if(gameState[i][col] !== value){
			isColMatch = false
			break
		}
	}

	if(isColMatch){
		return true
	}

	return false
}

const tileReducer = (state, action) => {
	switch (action.type) {
		//update tile
		case ActionTypes.UPDATE_TILE:
			let newGameState = state.gameState
			const rowIndex = action.payload.row
			const colIndex = action.payload.col
			newGameState[rowIndex][colIndex] = state.player
			return {
				...state,
				gameState: newGameState,
			}
		//reset tile
		case ActionTypes.RESET_TILE:
			const zeroState = [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0]
			]
			return {
				...state,
				gameState: zeroState
			}
		//change player
		case ActionTypes.CHANGE_PLAYER:
			let newPlayer = action.payload.player
			let player = state.player
			if (newPlayer === -1) {
				player = player === 1 ? 2 : 1
			} else {
				player = newPlayer
			}
			return {
				...state,
				player: player
			}
		// run game logic
		case ActionTypes.RUN_GAME_LOGIC:
			let row = action.payload.row
			let col = action.payload.col
			let isGameFinished = evaluateIndex(row,col,state.gameState)

			return  isGameFinished? {...state,isGameFinished: true} : state
			

		default:
			return state;
	}

};

export default tileReducer;