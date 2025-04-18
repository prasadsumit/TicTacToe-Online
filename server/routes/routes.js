const express = require('express')
const router = express.Router()
const dbService = require('../services/databaseService')

// READ - Get all items
router.get('/', async (req,res) => {
	try {
		const rooms = await dbService.getAllRooms(req.body.filter)
		res.json(rooms);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get('/:id', async (req,res) => {
	try {
		const { id } = req.params;
		const rooms = await dbService.getRoomByRoomId(id)
		res.json(rooms);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post('/', async (req, res) => {
	try {
		await dbService.createRoom(req.body);
		res.status(201).json("Room Created Successfully");
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const updatedRoom = await dbService.updateRoomByRoomId(id,req.body);
		res.status(201).json(updatedRoom);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});


module.exports = router;