const initialState = {
    showWinnerModal: false,
    isGameEvent: false,
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
    room: null,
    alertOptions: {
        visible: false,
        interactive: null,
        message: '',
        action: null,
        dismissAfter: null
    }
}
export default initialState
