import {createSlice} from '@reduxjs/toolkit'


function randomUserName() {
    return 'User ' + Math.floor(Math.random() * 100);
}

const initialState = {
    isConnected: false,
    isEstablishingConnection: false,
    userName: randomUserName(),
    activeUsers: ["me", "he", "she"]
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
        nameUpdated(state, action) {
            state.userName = action.payload;
            console.log('In Name updated', JSON.stringify(action));

        }
    }
})

export const gameActions = postsSlice.actions;

export default postsSlice.reducer;


export const getUserName = (state) => state.game.userName;
export const getIsConnected = (state) => state.game.isConnected;

