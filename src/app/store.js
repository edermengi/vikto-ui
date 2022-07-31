import {configureStore} from "@reduxjs/toolkit";
import gameSlice, {gameActions} from "./gameSlice";
import {socketMiddleware} from "./socket";
import {navigationMiddleware} from "./navigation";

const store = configureStore(
    {
        reducer: {
            game: gameSlice
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat([socketMiddleware, navigationMiddleware])
        },
    }
);
store.dispatch(gameActions.startConnecting({}))


export default store;