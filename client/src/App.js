import Homepage from './Pages/Homepage'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'


function RoomValidator() {
    const { roomId } = useParams()
    const [ isValid, setIsValid ] = useState(null)
    const serverUrl = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        if (roomId) {
            axios.get(`${serverUrl}/room/${roomId}`)
                .then((response) => {
                    return setIsValid(response !== null)
                })
                .catch(() => {
                    return setIsValid(false)
                })
        }
    }, [ roomId ])

    if (isValid === null) {
        return <h2>Loading...</h2>
    }
    return isValid ? <Homepage /> : <h2>404: Room Not Found</h2>
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/tic-tac-toe/" />} />
                <Route path="/tic-tac-toe/" element={<Homepage />} />
                <Route path="/tic-tac-toe/room/:roomId" element={<RoomValidator />} />
                <Route path="*" element={<h2 style={{ fontFamily: 'TimesNewRoman' }}>404: Page Not Found</h2>} />
            </Routes>
        </Router>
    )
}

export default App
