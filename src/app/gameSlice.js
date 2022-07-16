import {createSlice} from '@reduxjs/toolkit'


function randomUserName() {
    return 'User ' + Math.floor(Math.random() * 100);
}

const initialState = {
    userName: randomUserName(),
    activeUsers: ["me", "he", "she"]
}

const postsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        nameUpdated(state, action) {
        }
    }
})

export const {nameUpdated} = postsSlice.actions

export default postsSlice.reducer


export const getUserName = (state) => state.game.userName

