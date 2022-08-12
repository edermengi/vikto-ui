import {v4 as uuid} from "uuid";
import {gameActions} from "./gameSlice";
import {randomAvatarValue} from "../components/Game/Avataar";

const USER_ID = 'user-id'
const USER_NAME = 'user-name'
const AVATAR = 'avatar'


function randomUserName() {
    return 'User ' + Math.floor(Math.random() * 100);
}

function getOrDefault(name, fallback) {
    let val = localStorage.getItem(name);
    if (!val) {
        val = fallback();
        localStorage.setItem(name, val);
    }
    return val;
}

function setItem(key, val) {
    localStorage.setItem(key, val);
}

const storage = {
    getUserId: () => getOrDefault(USER_ID, uuid),
    getUserName: () => getOrDefault(USER_NAME, randomUserName),
    setUserName: (name) => setItem(USER_NAME, name),
    getAvatar: () => getOrDefault(AVATAR, randomAvatarValue),
    setAvatar: (name) => setItem(AVATAR, name)
};

export default storage;

export const localStorageMiddleware = (storeAPI) => {
    return next => action => {
        if (gameActions.nameUpdated.match(action)) {
            storage.setUserName(action.payload.userName);
            storage.setAvatar(action.payload.avatar);
        }
        return next(action);
    }
}
