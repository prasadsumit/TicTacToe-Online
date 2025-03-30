const constants = {
    CREATE_ROOM : 'CREATE_ROOM',
    ROOM_CREATED : 'ROOM_CREATED',
    ROOM_JOINED : 'ROOM_JOINED',
    JOIN_ROOM : 'JOIN_ROOM',
    PLAYER_JOINED : 'PLAYER_JOINED',
    CONNECTION_ESTABLISHED : 'CONNECTION_ESTABLISHED',
    ROOM_FULL : 'ROOM_FULL',
    ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',

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
