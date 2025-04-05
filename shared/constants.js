const constants = {
    CREATE_ROOM : 'CREATE_ROOM',
    ROOM_CREATED : 'ROOM_CREATED',
    ROOM_JOINED : 'ROOM_JOINED',
    JOIN_ROOM : 'JOIN_ROOM',
    PLAYER_JOINED : 'PLAYER_JOINED',
    CONNECTION_ESTABLISHED : 'CONNECTION_ESTABLISHED',
    ROOM_FULL : 'ROOM_FULL',
    ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
    UPDATE_SOCKET_ID: 'UPDATE_SOCKET_ID',
    PLAYER_NOT_FOUND: 'PLAYER_NOT_FOUND',
    SOCKET_ID_UPDATED: 'SOCKET_ID_UPDATED',

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
