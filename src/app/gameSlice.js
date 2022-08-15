import {createSlice} from '@reduxjs/toolkit'
import storage from "./storage";


const initialState = {
    isConnected: false,
    isEstablishingConnection: false,
    userName: storage.getUserName(),
    userId: storage.getUserId(),
    avatar: storage.getAvatar(),
    activePlayers: [],
    isNewGameStarting: false,
    isGameActive: false,
    gameId: null,
    ready: false,
    gameStarted: false
}

const postsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startConnecting: (state => {
            state.isEstablishingConnection = true;
        }),
        connectionEstablished: (state => {
            state.isConnected = true;
            state.isEstablishingConnection = false;
        }),
        connectionClosed: (state => {
            state.isConnected = false;
        }),
        nameUpdated: ((state, action) => {
            state.userName = action.payload.userName;
            state.avatar = action.payload.avatar;
            console.log('In Name updated', JSON.stringify(action));
        }),
        newGameStarting: (state => {
            console.log('Reducer: new Game starting');
            state.isNewGameStarting = true;
            state.isGameActive = false;
        }),
        gameJoining: ((state, action) => {
            console.log('Reducer: Game joining' + JSON.stringify(action.payload));
            state.isGameActive = false;
            state.gameId = action.payload.gameId
        }),
        newGameStarted: ((state, action) => {
            state.isNewGameStarting = false;
            state.isGameActive = true;
            state.gameId = action.payload.gameId;
            console.log(`Reducer: new Game started ${state.gameId} and ${JSON.stringify(state.activePlayers)}`);
        }),
        gameJoined: ((state, action) => {
            state.isNewGameStarting = false;
            state.isGameActive = true;
            state.gameId = action.payload.gameId;
            console.log(`Reducer:  Game joined ${state.gameId} and ${JSON.stringify(state.activePlayers)}`);
        }),
        gameStateNotification: ((state, action) => {
            state.activePlayers = action.payload.players;
            console.log(`Reducer:  Game notification ${state.gameId} and ${JSON.stringify(state.activePlayers)}`);
        }),
        ready: ((state) => {
            state.ready = true;
            console.log(`Reducer: ready`);
        }),
    }
})

export const gameActions = postsSlice.actions;

export default postsSlice.reducer;


export const getUserName = (state) => state.game.userName;
export const getAvatar = (state) => state.game.avatar;
export const getIsConnected = (state) => state.game.isConnected;
export const isNewGameStarting = (state) => state.game.isNewGameStarting;
export const isGameActive = (state) => state.game.isGameActive;
export const getGameId = (state) => state.game.gameId;
export const getActivePlayers = (state) => state.game.activePlayers;
export const getReady = (state) => state.game.ready;

