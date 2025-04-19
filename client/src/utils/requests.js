import axios from 'axios'

const fetchRoomData = async(roomId) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    try {
        let response = await axios.get(`${serverUrl}/room/${roomId}`)
        return Promise.resolve(response.data)
    } catch (error) {
        // Handle errors
        console.error('Error fetching room data:', error)
        return null
    }
}
export { fetchRoomData }
