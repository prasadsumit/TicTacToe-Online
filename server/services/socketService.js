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

	async createRoom(socket, userName, uuid) {

		const roomId = generateRandomRoomId();
		let room = {
			...constants.roomTemplate,
			roomId: roomId,
			players: new Map(),
			playerTurn: uuid,
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
		this.emitToRoom(roomId,constants.ROOM_CREATED, {roomId: roomId, message: 'Room created'})

    }

	async joinRoom(socket, roomId, userName, uuid) {
		//fetch current room data
		const currentRoom = await dbService.getRoomByRoomId(roomId)
		if(!currentRoom){
			socket.emit(constants.ROOM_NOT_FOUND, {roomId:roomId, message: 'Room not found'}) //only to sender
			return
		}
		if(Object.keys(currentRoom.players).length >= 2){
			socket.emit(constants.ROOM_FULL, {message: 'Room is full'}) //only to sender
			return
		}

		let updatedPlayers = {
			players: {
				...currentRoom.players,
				[uuid]: {
					player: {
						userName: userName,
						socketId: socket.id
					}
				}
			}
		}
		// Join user to the room
		socket.join(roomId)
		//update in db
		await dbService.updateRoomByRoomId(roomId, updatedPlayers)
		this.emitToRoom(roomId,constants.ROOM_JOINED, {roomId: roomId, userName: userName, message: 'Room joined'})
	}

	async updateSocketId(socket, roomId, userName, uuid) {
		//fetch current room data
		const currentRoom = await dbService.getRoomByRoomId(roomId)
		if(!currentRoom){
			this.emitToRoom(roomId, constants.ROOM_NOT_FOUND, {message: 'Room not found'})
			return
		}
		if(!currentRoom.players[uuid]){
			this.emitToRoom(roomId, constants.PLAYER_NOT_FOUND, {message: 'Player not found'})
			return
		}

		let updatedPlayers = {
			players: {
				...currentRoom.players,
				[uuid]: {
					player: {
						userName: userName,
						socketId: socket.id
					}
				}
			}
		}
		// Join user to the room
		socket.join(roomId)
		//update in db
		await dbService.updateRoomByRoomId(roomId, updatedPlayers)
		this.emitToRoom(roomId,constants.SOCKET_ID_UPDATED, {roomId: roomId, message: 'Socket Id updated'})
	}

	async updateRoom(socket, room) {
		//update in db
		await dbService.updateRoomByRoomId(room.roomId, room)
		this.emitToRoom(room.roomId,constants.DB_UPDATED, {roomId: room.roomId, message: 'DB updated'},socket)
	}

	async startNewGame(socket, roomId, userName) {
		//update in db
		let currentRoom = await dbService.getRoomByRoomId(roomId)
		currentRoom.isGameFinished = false
		currentRoom.isGameDrawn = false
		await dbService.updateRoomByRoomId(roomId, currentRoom)
		this.emitToRoom(roomId,constants.START_NEW_GAME, {roomId: roomId, message: 'New game started!', userName:userName},socket)
	}

	emitToRoom(roomId, event, data, socket = null) {
		if (!this.io) {
			throw new Error('Socket service not initialized');
		}
		if (socket) {
			// Exclude the sender
			socket.to(roomId).emit(event, data);
		} else {
			// Include everyone in the room
			this.io.to(roomId).emit(event, data);
		}
	}
}

module.exports = new SocketService()
