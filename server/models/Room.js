const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    players: {
        type: Map,
        of: new mongoose.Schema({
            uuid: { type: String, required: true },
            player: {
                userName: { type: String, required: true },
                socketId: { type: String, required: true }
            }
        })
    },
    isGameFinished: { type: Boolean, default: false },
    gameState: {
        type: [ [ Number ] ], // 2D array for Tic-Tac-Toe grid
        default: [
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ]
    }
})

module.exports = mongoose.model('Room', RoomSchema)
