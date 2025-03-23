const { generateRandomRoomId } = require("../id-generator");
const {constants} = require("../../../shared/constants");


 function socketCreateRoom(socket) {
	return socket.on(constants.CREATE_ROOM, (userName,uuid,callback) => {
		const roomId = generateRandomRoomId();
		let room = constants.roomTemplate;
		room = {
			...room,
			id: roomId
		}
		// Join the creator to the room
		socket.join(roomId);
		room.players[uuid] = [userName,socket.id];

		//update in db
		try {
			const response = fetch("http://localhost:3030/rooms", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(room)})

			callback({ success: true, roomId: roomId, message: `Successfully created room with id ${roomId}` });
		} catch (error) {
			callback({ success: false, message: "Error creating room.", error: error });
		}

	});

}

module.exports = { socketCreateRoom }