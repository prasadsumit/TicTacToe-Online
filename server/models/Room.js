const mongoose = require('mongoose')
const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    players: {
        type: Map,
        of: new mongoose.Schema({
            player: {
                userName: { type: String, required: true },
                socketId: { type: String, required: true },
                wins: { type: Number, default: 0 },
                draws: { type: Number, default: 0 },
                losses: { type: Number, default: 0 }
            }
        }),
    },
    isGameFinished: { type: Boolean, default: false },
    isGameDrawn: { type: Boolean, default: false },
    playerTurn: { type: String, required: true },
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
