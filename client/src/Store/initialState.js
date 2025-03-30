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
        inputRoomId: null,
    },
    userInfo: {
        name: '',
        id: '',
    },
    roomId: null,
}
export default initialState
