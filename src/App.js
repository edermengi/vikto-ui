import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import Board from "./components/Board/Board";
import {Provider} from "react-redux";
import store from "./app/store";
import React from 'react'

import {BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom'

import Game from "./components/Game/Game";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <div className="App">
                        <AppHeader></AppHeader>
                        <Routes>
                            <Route path="/" element={<Board></Board>}/>
                            <Route path="game">
                                <Route path=":gameId" element={<Game></Game>}/>
                            </Route>
                            <Route path="*" element={<Navigate to ="/" />}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
