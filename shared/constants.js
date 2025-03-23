const constants = {
    CREATE_ROOM : 'CREATE_ROOM',
    ROOM_CREATED : 'ROOM_CREATED',
    JOIN_ROOM : 'JOIN_ROOM',
    PLAYER_JOINED : 'PLAYER_JOINED',
    CONNECTION_ESTABLISHED : 'CONNECTION_ESTABLISHED',

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
