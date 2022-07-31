import {createSlice} from '@reduxjs/toolkit'
import storage from "./storage";


const initialState = {
    isConnected: false,
    isEstablishingConnection: false,
    userName: storage.getUserName(),
    userId: storage.getUserId(),
    activeUsers: ["me", "he", "she"],
    isNewGameStarting: false,
    isGameActive: false,
    gameId: null
}

const postsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startConnecting: (state => {
            state.isEstablishingConnection = true;
        }),
        connectionEstablished: (state => {
            console.log('Slice on connection');
            state.isConnected = true;
            state.isEstablishingConnection = false;
        }),
        connectionClosed: (state => {
            console.log('Slice on close');
            state.isConnected = false;
        }),
        nameUpdated: ((state, action) => {
            let userName = action.payload;
            state.userName = userName;
            storage.setUserName(userName)
            console.log('In Name updated', JSON.stringify(action));
        }),
        newGameStarting: (state => {
            console.log('Reducer: new Game starting');
            state.isNewGameStarting = true;
            state.isGameActive = false;
        }),
        newGameStarted: ((state, action) => {
            state.isNewGameStarting = false;
            state.isGameActive = true;
            state.gameId = action.payload.gameId;
            console.log(`Reducer: new Game started ${state.gameId}`);
        }),

    }
})

export const gameActions = postsSlice.actions;

export default postsSlice.reducer;


export const getUserName = (state) => state.game.userName;
export const getIsConnected = (state) => state.game.isConnected;
export const isNewGameStarting = (state) => state.game.isNewGameStarting;

