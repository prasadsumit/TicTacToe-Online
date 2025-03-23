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


// socket connection
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000', // Update to match your client origin
//         methods: [ 'GET', 'POST' ]
//     }
// })

const io = socketService.initialize(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: [ 'GET', 'POST' ],
        credentials: true
    }
})


// When a client connects
io.on('connection', (socket) => {

    // socketCreateRoom(socket)
    //
    // socketJoinRoom(socket, io)

    // Handle disconnection
    // socket.on('disconnect', () => {
    //     console.log('A user disconnected', socket.id)
    //     // Remove the user from any rooms (pseudo code below)
    //     // removeUserFromRooms(socket.id)
    // })

    socket.on(constants.CREATE_ROOM, async (userName, uuid) => {
        await socketService.createRoom( socket, userName, uuid)
    })
})


