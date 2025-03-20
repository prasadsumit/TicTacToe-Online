const { constants } = require('../constants')

async function joinRoom(socket, io, roomId, userName, uuid, callback) {
	try {
		console.log('join room started with', roomId + "   " + userName + "   " + uuid)
		let response = await fetch(`http://localhost:3030/rooms/?id=${roomId}`, {
			method: 'GET',
		})
		const room = await response.json().then((data) => data[0])
		console.log('room fetched', room)
		if(room.players[uuid]) {
			if(socket.id !== room.players[uuid][1]) {
				//update socket id
				room.players[uuid][1] = socket.id
				//update in db
				console.log('About to send PATCH, current socket.id:', socket.id);

				response = await fetch(`http://localhost:3030/rooms/${roomId}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						players: room.players
					})
				})

				//after your PATCH request completes
				console.log('PATCH request completed, current socket.id:', socket.id);
			}
			callback({ success: false, message: 'Already in room' })
			console.log('Already in room')
			return
		} else if (Object.keys(room.players).length === 2) {
			callback({ success: false, message: 'Room is full' })
			console.log('Room is full')
			return
		} else{
			// Join the user to the room
			socket.join(roomId)
			room.players[uuid] = [userName,socket.id]

			//update in db
			response = await fetch(`http://localhost:3030/rooms/${roomId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					players: room.players
				})
			})
			// Notify players
			io.to(roomId).emit(constants.PLAYER_JOINED, { players: room.players })
			callback({ success: true, message: `Joined room ${roomId}` })
			// console.log(`Joined room ${roomId}`)
			console.log('join room ended')
		}
	} catch (error) {
		// callback({ success: false, message: 'Room does not exist' })
		console.log('Error joining room', error)
		console.log('join room ended')
	}

}

function socketJoinRoom(socket, io) {
	return socket.on(constants.JOIN_ROOM, (roomId,userName,uuid, callback) => {
		// console.log('join room started with', roomId + "   " + userName)
		joinRoom(socket, io, roomId, userName, uuid, callback)
	})
}


module.exports = { socketJoinRoom }
