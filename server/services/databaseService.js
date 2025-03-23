const Room = require('../models/Room')

class DatabaseService {

	async createRoom(roomInfo) {
		try {
			return await Room.create(roomInfo)
		} catch (error) {
			throw new Error(`Error creating room: ${error.message}`)
		}
	}

	async getAllRooms(filter = {}, sort = { date: -1 }) {
		try {
			return await Room.find(filter).sort(sort)
		} catch (error) {
			throw new Error(`Error fetching items: ${error.message}`)
		}
	}

	async getRoomByRoomId(id) {
		try {
			const room = await Room.findOne({ roomId: id });
			if (!room) {
				throw new Error('Room not found')
			}
			return room;
		} catch (error) {
			throw new Error(`Error fetching Room: ${error.message}`)
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
			throw new Error(`Error updating item: ${error.message}`);
		}
	}
}


module.exports = new DatabaseService()