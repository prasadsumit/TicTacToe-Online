const mongoose = require('mongoose')

// Mongoose does not enforce a specific format for the keys of a Map, so you can use UUIDs as keys when inserting data.


const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    players: {
        type: Map,
        of: new mongoose.Schema({
            player: {
                userName: { type: String, required: true },
                socketId: { type: String, required: true }
            }
        }),
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
