import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import React from 'react'

import {Outlet} from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <div className="App">
                <AppHeader></AppHeader>
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default App;
