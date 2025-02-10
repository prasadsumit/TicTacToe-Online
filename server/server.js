// Import required modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const {socketCreateRoom} = require("./middleware/socket-functions/create-room");
const {socketJoinRoom} = require("./middleware/socket-functions/join-room");

// Create server and Socket.IO instance
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000", // Update to match your client origin
		methods: ["GET", "POST"]
	}
});


const PORT = 5000;


const rooms = {};

// When a client connects
io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	// EVENT: Create a new room
	socketCreateRoom(socket)

	// EVENT: Join an existing room
	socketJoinRoom(socket,io)

	// EVENT: Make a move
	// socket.on("makeMove", ({ roomName, row, col, player }, callback) => {
	// 	const room = rooms[roomName];
	//
	// 	// Validate room and move
	// 	if (!room) {
	// 		return callback({ success: false, message: "Room does not exist" });
	// 	}
	//
	// 	const { gameState } = room;
	// 	if (gameState[row][col] !== 0) {
	// 		return callback({ success: false, message: "Invalid move" });
	// 	}
	//
	// 	// Update game state
	// 	gameState[row][col] = player;
	//
	// 	// Check for winner or tie (pseudo code below)
	// 	// const result = checkGameResult(gameState);
	//
	// 	// Broadcast updated game state
	// 	io.to(roomName).emit("gameUpdate", { gameState });
	//
	// 	// If game is over, broadcast result
	// 	// if (result) {
	// 	//   io.to(roomName).emit("gameOver", { result });
	// 	// }
	//
	// 	callback({ success: true, message: "Move made", gameState });
	// });
	//
	// // EVENT: Reset the game
	// socket.on("resetGame", (roomName, callback) => {
	// 	const room = rooms[roomName];
	//
	// 	// Validate room
	// 	if (!room) {
	// 		return callback({ success: false, message: "Room does not exist" });
	// 	}
	//
	// 	// Reset game state
	// 	room.gameState = Array(3).fill(null).map(() => Array(3).fill(0));
	//
	// 	// Notify players
	// 	io.to(roomName).emit("gameReset", { gameState: room.gameState });
	// 	callback({ success: true, message: "Game reset" });
	// });

	// Handle disconnection
	socket.on("disconnect", () => {
		console.log("A user disconnected", socket.id);

		// Remove the user from any rooms (pseudo code below)
		// removeUserFromRooms(socket.id);
	});
});

// Start server
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

/**
 * Pseudo Code for Additional Functions:
 *
 * 1. checkGameResult(gameState):
 *    - Check rows, columns, and diagonals for a winner.
 *    - Return the winner or "tie" if no moves left.
 *
 * 2. removeUserFromRooms(userId):
 *    - Iterate over all rooms.
 *    - Remove user from any room they are part of.
 *    - If room becomes empty, delete it.
 */
