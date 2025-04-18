const Room = require('../models/Room')

class DatabaseService {

	async createRoom(roomInfo) {
		try {
			return await Room.create(roomInfo)
		} catch (error) {
			console.log(`Error creating room: ${error.message}`)
			return null
		}
	}

	async getAllRooms(filter = {}, sort = { date: -1 }) {
		try {
			return await Room.find(filter).sort(sort)
		} catch (error) {
			console.log(`Error fetching items: ${error.message}`)
			return null
		}
	}

	async getRoomByRoomId(id) {
		try {
			const room = await Room.findOne({ roomId: id }).lean();
			if (!room) {
				console.log('Room not found')
				return null
			}
			return room;
		} catch (error) {
			console.log(`Error fetching Room: ${error.message}`)
			return null
		}
	}

	async updateRoomByRoomId(id, updateData) {
		try {
			const room = await this.getRoomByRoomId(id)
			return await Room.findByIdAndUpdate(
				room._id,
				{$set: updateData},
				{new: true, runValidators: true}
			);
		} catch (error) {
			console.log(`Error updating item: ${error.message}`)
			return null
		}
	}
}


module.exports = new DatabaseService()