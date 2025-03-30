import Homepage from './Pages/Homepage'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import RoomPage from './Pages/RoomPage'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Socket from './socket'


function Test() {
    const [ message, setMessage ] = useState('Loading...')
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) {
            return
        }
        hasFetched.current = true

        async function fetchData() {
            try {
                let response = await axios.post('http://localhost:5000/message', { text: 'Hello from Axios!' })
                console.log(response.data)
                setMessage(response.data.text)
            } catch (error) {
                setMessage('Error fetching data')
                console.error('API Error:', error)
            }
        }

        fetchData()
    }, []) // Runs once when component mounts

    return (
        <h2 style={{ fontFamily: 'TimesNewRoman' }}>{message}</h2>
    )
}

function RoomValidator() {
    const { roomId } = useParams()
    const [ isValid, setIsValid ] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:5000/room/${roomId}`)
            .then((response) => {
                return setIsValid(response !== null)
            })
            .catch(() => {
                return setIsValid(false)
            })
    }, [ roomId ])

    if (isValid === null) {
        return <h2>Loading...</h2>
    }
    return isValid ? <RoomPage /> : <h2>404: Room Not Found</h2>
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/tic-tac-toe/" />} />
                <Route path="/tic-tac-toe/" element={<Homepage />} />
                <Route path="/tic-tac-toe/room/:roomId" element={<RoomValidator />} />
                <Route path="/test/*" element={<Test />} />
                <Route path="/abcd/*" element={<Socket/>} />
                <Route path="*" element={<h2 style={{ fontFamily: 'TimesNewRoman' }}>404: Page Not Found</h2>} />
            </Routes>
        </Router>
    )
}

export default App
