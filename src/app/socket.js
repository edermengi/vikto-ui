import {WS_URL} from './config';
import {gameActions} from "./gameSlice";
import storage from "./storage";

export class GameEvent {
    static NewGame = '$newGame'
    static JoinGame = '$joinGame'
    static ExitGame = '$exitGame'
    static Ready = '$ready'
    static UpdateUser = '$updateUser'
    static RegisterUser = '$registerUser'
    static GameStateNotification = '$gamePush'
    static PlayersStateNotification = '$playersPush'
    static Answer = '$answer'
    static ChooseTopic = '$chooseTopic'
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

    function sendUpdateUser(userName, avatar) {
        socket.send(
            outMessage(
                GameEvent.UpdateUser,
                {
                    userId: storeAPI.getState().game.userId,
                    userName: userName,
                    avatar: avatar
                })
        );
    }

    function registerUser(userName, avatar) {
        socket.send(
            outMessage(
                GameEvent.RegisterUser,
                {
                    userId: storeAPI.getState().game.userId,
                    userName: userName,
                    avatar: avatar
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

    function joinGame(gameId) {
        socket.send(
            outMessage(
                GameEvent.JoinGame,
                {
                    gameId: gameId,
                    userId: storeAPI.getState().game.userId
                })
        );
    }

    function ready() {
        socket.send(
            outMessage(
                GameEvent.Ready,
                {
                    gameId: storeAPI.getState().game.gameId,
                    userId: storeAPI.getState().game.userId
                })
        );

    }

    function answer(answer) {
        socket.send(
            outMessage(
                GameEvent.Answer,
                {
                    gameId: storeAPI.getState().game.gameId,
                    userId: storeAPI.getState().game.userId,
                    answer: answer
                })
        );
    }

    function chooseTopic(topic) {
        socket.send(
            outMessage(
                GameEvent.ChooseTopic,
                {
                    gameId: storeAPI.getState().game.gameId,
                    userId: storeAPI.getState().game.userId,
                    topic: topic
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
                        break;
                    case GameEvent.JoinGame:
                        storeAPI.dispatch(gameActions.gameJoined(data.data));
                        break;
                    case GameEvent.GameStateNotification:
                        storeAPI.dispatch(gameActions.gameStateNotification(data.data));
                        break;
                    case GameEvent.PlayersStateNotification:
                        storeAPI.dispatch(gameActions.playersStateNotification(data.data));
                        break;
                }
            };


        }

        if (gameActions.connectionEstablished.match(action)) {
            registerUser(storage.getUserName(), storage.getAvatar());
        }

        if (gameActions.nameUpdated.match(action) && isConnectionEstablished) {
            sendUpdateUser(action.payload.userName, action.payload.avatar);
        }

        if (gameActions.newGameStarting.match(action) && isConnectionEstablished) {
            startNewGame();
        }

        if (gameActions.gameJoining.match(action) && isConnectionEstablished) {
            joinGame(action.payload.gameId);
        }

        if (gameActions.ready.match(action) && isConnectionEstablished) {
            ready();
        }

        if (gameActions.answer.match(action) && isConnectionEstablished) {
            answer(action.payload.answer);
        }

        if (gameActions.chooseTopic.match(action) && isConnectionEstablished) {
            chooseTopic(action.payload.topic);
        }

        return next(action);
    }
}
