const initialState = {
    gameState: [
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
    ],
    player: 1,
    isGameFinished: false,
    showWinnerModal: false,
    inputModal: {
        showInputModal: false,
        submitAction: null,
    },
    userInfo: {
        name: '',
        id: '',
    },
}
export default initialState
