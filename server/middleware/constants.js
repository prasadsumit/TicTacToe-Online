const constants = {
    CREATE_ROOM : 'createRoom',
    JOIN_ROOM : 'joinRoom',
    PLAYER_JOINED : 'playerJoined',

    roomTemplate : {
        players: {},
        isGameFinished: false,
        gameState: [
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
        ]
    }
}

module.exports = { constants: constants }
