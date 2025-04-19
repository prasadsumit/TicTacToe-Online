import { createContext } from 'react'
import { io } from 'socket.io-client'

// Initialize the socket connection
const serverUrl = process.env.REACT_APP_SERVER_URL
const socket = io(serverUrl)

// Create a context with the socket instance
const SocketContext = createContext(socket)


export { socket, SocketContext }
