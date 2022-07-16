import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import Board from "./components/Board/Board";
import {Provider} from "react-redux";
import store from "./app/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="App">
                    <AppHeader></AppHeader>
                    <Board></Board>
                </div>
            </div>
        </Provider>
    );
}

export default App;
