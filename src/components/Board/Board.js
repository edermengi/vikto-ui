import {Button, Grid} from "@mui/material";
import {Add, Groups} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {gameActions, isNewGameStarting, isGameActive, getGameId} from "../../app/gameSlice";
import {LoadingButton} from "@mui/lab";
import store from "../../app/store";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import JoinGameDialog from "./JoinGameDialog";


const Board = () => {

    const newGameStarting = useSelector(isNewGameStarting);
    const gameActive = useSelector(isGameActive);
    const gameId = useSelector(getGameId);

    const [showJoinGameDialog, setShowJoinGameDialog] = useState(false);
    const toggleShowJoinGameDialog = () => setShowJoinGameDialog(p => !p);

    const handleCreateGame = () => {
        store.dispatch(gameActions.newGameStarting());
    }

    return (
        <div>
            {gameActive && (
                <Navigate to={"game/" + gameId} replace={true}/>
            )}
            <Grid sx={{pt: 4, pl: 4, pr: 4}}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <LoadingButton variant="contained"
                                       sx={{width: '100%', height: 60}}
                                       startIcon={<Add/>}
                                       loading={newGameStarting}
                                       loadingPosition="start"
                                       onClick={handleCreateGame}>Создать игру</LoadingButton>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" sx={{width: '100%', height: '100%'}}
                                startIcon={<Groups></Groups>}
                                onClick={toggleShowJoinGameDialog}
                        >Присоединиться к игре</Button>
                    </Grid>
                </Grid>
            </Grid>
            <JoinGameDialog show={showJoinGameDialog} toggleShow={toggleShowJoinGameDialog}/>
        </div>
    )
}

export default Board;