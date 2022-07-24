import {configureStore} from "@reduxjs/toolkit";
import gameSlice, {gameActions} from "./gameSlice";
import {socketMiddleware} from "./socket";

const store = configureStore(
    {
        reducer: {
            game: gameSlice
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat([socketMiddleware])
        },
    }
);
store.dispatch(gameActions.startConnecting({}))


export default store;