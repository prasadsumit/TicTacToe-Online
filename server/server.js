const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const { socketCreateRoom } = require('./middleware/socket-functions/create-room')
const { socketJoinRoom } = require('./middleware/socket-functions/join-room')
const cors = require('cors')
const router = require('./routes/routes')
const socketService = require('./services/socketService')
const {constants} = require("../shared/constants");
require('dotenv').config({ path: '.env.local' })

// Create server and Socket.IO instance
const app = express()
const PORT = process.env.PORT || 5000


app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/room', router)


const server = http.createServer(app)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        return console.log('MongoDB connection established')
    })
    .catch((err) => {
        return console.log('MongoDB connection error: ', err)
    })


const io = socketService.initialize(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: [ 'GET', 'POST' ],
        credentials: true
    }
})


// When a client connects
io.on('connection', (socket) => {

    socket.on(constants.CREATE_ROOM, async (userName, uuid) => {
        console.log('Create Room request received')
        await socketService.createRoom( socket, userName, uuid)
    })

    socket.on(constants.JOIN_ROOM, async (roomId, userName, uuid) => {
        console.log('Join Room request received with room ID: ', roomId)
        await socketService.joinRoom( socket, roomId, userName, uuid)
    })

    socket.on(constants.UPDATE_SOCKET_ID, async (roomId, userName, uuid) => {
        console.log('Update socket request received with room ID: ', roomId)
        await socketService.updateSocketId( socket, roomId, userName, uuid)
    })
})





