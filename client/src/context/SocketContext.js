import { createContext } from 'react'
import { io } from 'socket.io-client'

// Initialize the socket connection
const socket = io('http://localhost:5000')

// Create a context with the socket instance
const SocketContext = createContext(socket)


export { socket, SocketContext }
