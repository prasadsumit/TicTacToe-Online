function generateRandomRoomId(length = 6) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let roomId = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        roomId = roomId + characters[randomIndex]
    }

    return roomId
}

module.exports = { generateRandomRoomId: generateRandomRoomId }
