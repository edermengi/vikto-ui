import {configureStore} from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import thunk from "redux-thunk";

export default configureStore(
    {
        reducer: {
            game: gameSlice
        }
    }
);