import {createSlice} from '@reduxjs/toolkit'
import storage from "./storage";
import {ASK_QUESTION} from "./constants";


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
    gameStarted: false,
    gameState: null,
    question: null,
    topic: null,
    topicOptions: null,
    winners: null,
    timerSeconds: 0,
    roundNo: null,
    questionNo: 0,
    totalNumberOfRounds: 0,
    totalNumberOfQuestions: 0
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
            state.gameId = action.payload.gameId;
            state.activePlayers = action.payload.players;
            state.gameState = action.payload.gameState;
            state.question = action.payload.question;
            state.topic = action.payload.topic;
            state.topicOptions = action.payload.topicOptions;
            state.winners = action.payload.winners;
            state.timerSeconds = action.payload.timerSeconds;
            state.roundNo = action.payload.roundNo;
            state.questionNo = action.payload.questionNo;
            state.totalNumberOfRounds = action.payload.totalNumberOfRounds;
            state.totalNumberOfQuestions = action.payload.totalNumberOfQuestions;
            if (action.payload.gameState === ASK_QUESTION) {
                state.answer = null;
            }
            console.log(`Reducer:  Game notification ${state.gameId} and ${JSON.stringify(state)}`);
        }),
        playersStateNotification: ((state, action) => {
            state.gameId = action.payload.gameId;
            state.activePlayers = action.payload.players;
            console.log(`Reducer:  Players notification ${state.gameId} and ${JSON.stringify(state)}`);
        }),
        ready: ((state) => {
            state.ready = true;
            console.log(`Reducer: ready`);
        }),
        answer: ((state, action) => {
            state.answer = action.payload.answer;
            console.log(`Answer: ${action.payload.answer}`);
        }),
        chooseTopic: ((state, action) => {
            state.topic = action.payload.topic;
            console.log(`Selected topic: ${action.payload.topic}`);
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
export const getGameState = (state) => state.game.gameState;
export const getQuestion = (state) => state.game.question;
export const getActivePlayers = (state) => state.game.activePlayers;
export const getReady = (state) => state.game.ready;
export const getAnswer = (state) => state.game.answer;
export const getTopic = (state) => state.game.topic;
export const getTopicOptions = (state) => state.game.topicOptions;
export const getWinners = (state) => state.game.winners;
export const getTimerSeconds = (state) => state.game.timerSeconds;
export const getQuestionNo = (state) => state.game.questionNo;
export const getRoundNo = (state) => state.game.roundNo;
export const getTotalNumberOfRounds = (state) => state.game.totalNumberOfRounds;
export const getTotalNumberOfQuestions = (state) => state.game.totalNumberOfQuestions;


