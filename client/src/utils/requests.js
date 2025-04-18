import axios from 'axios'

const fetchRoomData = async(roomId) => {
    try {
        let response = await axios.get(`http://localhost:5000/room/${roomId}`)
        return Promise.resolve(response.data)
    } catch (error) {
        // Handle errors
        console.error('Error fetching room data:', error)
        return null
    }
}
export { fetchRoomData }
