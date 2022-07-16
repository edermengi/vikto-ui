import React, { createContext } from 'react'
import { WS_URL } from '../../app/config';
import { useDispatch } from 'react-redux';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    const sendMessage = (gameId, message) => {
        const payload = {
            action: '$default',
            gameId: gameId,
            data: message
        }
        socket.send(JSON.stringify(payload));
        // dispatch(updateChatLog(payload));
    }

    if (!socket) {
        socket = new WebSocket(WS_URL);

        socket.onopen = function (event) {
            // socket.send("Here's some text that the server is urgently awaiting!");
        };

        socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

        socket.addEventListener('error', function (event) {
            console.log(event)
        });

        socket.addEventListener('close', function (event) {
            console.log("socket close")
        });

        ws = {
            socket: socket,
            sendMessage
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
