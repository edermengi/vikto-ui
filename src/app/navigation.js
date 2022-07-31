import {gameActions} from "./gameSlice";

export const navigationMiddleware = (storeAPI) => {

    return next => action => {

        if (gameActions.newGameStarted.match(action)) {
            console.log(`in navigation`);
        }

        return next(action);
    }
}
