const {constants} = require("../constants");

function socketJoinRoom(socket,io) {
	return socket.on(constants.JOIN_ROOM, (roomId,userName, callback) => {
		try {
			const room = fetch(`http://localhost:3001/rooms/${roomId}`);
			if(room.players[socket.id]) {
				callback({ success: false, message: "Already in room" });
				return;
			}
			if (room.players.length === 2) {
				callback({ success: false, message: "Room is full" });
				return;
			}

			// Join the user to the room
			socket.join(roomId);
			room[roomId].players[socket.id] = userName;

			const response = fetch(`http://localhost:3001/rooms/${roomId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					players: room.players
				})
			})

			// Notify players
			io.to(roomId).emit(constants.PLAYER_JOINED, { players: room.players });
			callback({ success: true, message: `Joined room ${roomId}`});

		} catch (error) {
			callback({ success: false, message: "Room does not exist" });
		}

	});
}