import {WS_URL} from './config';
import {gameActions} from "./gameSlice";
import storage from "./storage";

export class GameEvent {
    static NewGame = '$newGame'
    static ExitGame = '$exitGame'
    static UpdateUser = '$updateUser'
}

function outMessage(action, payload) {
    return JSON.stringify({
        action: action,
        data: payload
    });
}

function inMessage(data) {
    return JSON.parse(data);
}

export const socketMiddleware = (storeAPI) => {
    let socket = null;

    function sendUpdateName() {
        socket.send(
            outMessage(
                GameEvent.UpdateUser,
                {
                    userId: storeAPI.getState().game.userId,
                    userName: storeAPI.getState().game.userName
                })
        );
    }

    function startNewGame() {
        socket.send(
            outMessage(
                GameEvent.NewGame,
                {
                    userId: storeAPI.getState().game.userId
                })
        );
    }

    return next => action => {
        const isConnectionEstablished = socket && storeAPI.getState().game.isConnected;

        if (gameActions.startConnecting.match(action)) {
            socket = new WebSocket(WS_URL + `?userId=${storage.getUserId()}`);

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
                console.log('Socket on message ' + message.data);
                const data = inMessage(message.data);
                switch (data.action) {
                    case GameEvent.NewGame:
                        storeAPI.dispatch(gameActions.newGameStarted(data.data));
                }
            };


        }

        if (gameActions.connectionEstablished.match(action)) {
            sendUpdateName();
        }

        if (gameActions.nameUpdated.match(action) && isConnectionEstablished) {
            sendUpdateName();
        }

        if (gameActions.newGameStarting.match(action) && isConnectionEstablished) {
            startNewGame();
        }

        return next(action);
    }
}
