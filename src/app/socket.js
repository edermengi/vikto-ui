import {WS_URL} from './config';
import {gameActions} from "./gameSlice";

export class GameEvent {
    static NewGame = '$newGame'
    static ExitGame = '$exitGame'
    static UpdateName = '$updateName'
}

function outMessage(action, payload) {
    return JSON.stringify({
        action: action,
        data: payload
    });
}

export const socketMiddleware = (storeAPI) => {
    let socket = null;

    function sendUpdateName() {
        socket.send(
            outMessage(
                GameEvent.UpdateName,
                {'name': storeAPI.getState().game.userName})
        );
    }

    return next => action => {
        const isConnectionEstablished = socket && storeAPI.getState().game.isConnected;

        if (gameActions.startConnecting.match(action)) {
            socket = new WebSocket(WS_URL);

            socket.onopen = (message) => {
                console.log('Socket on connect ' + message);
                storeAPI.dispatch(gameActions.connectionEstablished({}));
            };

            socket.onclose = (message) => {
                console.log('Socket on close ' + message);
                storeAPI.dispatch(gameActions.connectionClosed({}));
            };

            socket.onerror = (ev) => {
                console.log('Socket error ' + ev);
            };

            socket.onmessage = (message) => {
                console.log('Socket on message ' + message);
            };


        }

        if (gameActions.connectionEstablished.match(action)) {
            sendUpdateName();
        }

        if (gameActions.nameUpdated.match(action) && isConnectionEstablished) {
            sendUpdateName();
        }

        return next(action);
    }
}
