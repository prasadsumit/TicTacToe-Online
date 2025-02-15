import Homepage from './Pages/Homepage'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import RoomPage from './Pages/RoomPage'


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/tic-tac-toe/" />} />
                <Route path="/tic-tac-toe/" element={<Homepage />} />
                <Route path="/tic-tac-toe/room/:roomId" element={<RoomPage />} />
                <Route path="*" element={<h2 style={{ fontFamily: 'TimesNewRoman' }}>404: Page Not Found</h2>} />
            </Routes>
        </Router>
    )
}

export default App
