import Homepage from './Pages/Homepage'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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

let roomIds = [ 'abc', 'def' ]

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/tic-tac-toe/" />} />
                <Route path="/tic-tac-toe/" element={<Homepage />} />
                {
                    roomIds.map((id) => {
                        return <Route key={id} path={`/tic-tac-toe/room/${id}`} element={<RoomPage />} />
                    })
                }
                <Route path="/test/*" element={<Test />} />
                <Route path="/abcd/*" element={<Socket/>} />
                <Route path="*" element={<h2 style={{ fontFamily: 'TimesNewRoman' }}>404: Page Not Found</h2>} />
            </Routes>
        </Router>
    )
}

export default App
