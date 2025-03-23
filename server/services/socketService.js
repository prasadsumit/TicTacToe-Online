const { Server } = require('socket.io')
const { constants } = require('../../shared/constants')
const {generateRandomRoomId} = require("../middleware/id-generator");
const dbService = require("./databaseService");

class SocketService {
    constructor() {
        this.io = null
    }

    initialize(server, options) {
        this.io = new Server(server, options)

        // Setup default connection handler
        this.io.on('connection', (socket) => {
            this._handleConnection(socket)
        })

        console.log('Socket.IO service initialized')
        return this.io
    }

    _handleConnection(socket) {
        console.log(`New socket connection: ${socket.id}`)

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`)
        })

        // Emit welcome event to the client
        socket.emit(constants.CONNECTION_ESTABLISHED, {
            socketId: socket.id,
            message: 'Successfully connected to the server'
        })

    }


    joinRoom(socket, roomName) {
        return true
    }

	async createRoom(socket, userName, uuid) {

		const roomId = generateRandomRoomId();
		let room = {
			...constants.roomTemplate,
			roomId: roomId,
			players: new Map()
		};

		room.players.set(uuid, {
			uuid: uuid,
			player: {
				userName: userName,
				socketId: socket.id
			}
		});

		// Join the creator to the room
		socket.join(roomId)

		//update in db
		await dbService.createRoom(room)
		this.emitToRoom(roomId,constants.ROOM_CREATED)

    }

    emitToRoom(roomName, event, data) {
        if (!this.io) {
            throw new Error('Socket service not initialized')
        }
        this.io.to(roomName).emit(event, data)
    }
}

module.exports = new SocketService()
