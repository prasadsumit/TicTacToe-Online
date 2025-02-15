const { generateRandomRoomId } = require("../id-generator");
const {constants} = require("../constants");


function socketCreateRoom(socket) {
	return socket.on(constants.CREATE_ROOM, (userName,callback) => {

		const roomId = generateRandomRoomId();
		let room = constants.roomTemplate;
		room = {
			...room,
			roomId: roomId
		}
		// Join the creator to the room
		socket.join(roomId);
		room.players[socket.id] = userName;

		//update in db
		try {
			const response = fetch("http://localhost:3001/rooms", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(room)})

			callback({ success: true, roomId: roomId, message: `Successfully created room with id ${roomId}` });
		} catch (error) {
			callback({ success: false, message: "Error creating room.", error: error });
		}

	});

}