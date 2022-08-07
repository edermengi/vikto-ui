import {Avatar, Grid, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {gameActions, getActivePlayers, getIsConnected} from "../../app/gameSlice";
import {useParams} from "react-router-dom";
import store from "../../app/store";
import {useEffect} from "react";


function PlayerItem(props) {
    return <div key={props.player.userId}><Avatar sx={{mr: 1}}/>{props.player.userName}</div>;
}


const Game = () => {

    const activePlayers = useSelector(getActivePlayers);
    const isConnected = useSelector(getIsConnected);
    let params = useParams();

    useEffect(() => {
        if (isConnected) {
            store.dispatch(gameActions.gameJoining({'gameId': params.gameId}));
        }
    }, [isConnected])

    return (
        <Grid sx={{pt: 4, pl: 4, pr: 4}}>
            <div>{params.gameId}</div>
            <Stack direction="row" spacing={2}>
                {activePlayers.map(player => {
                    return <PlayerItem key={player.userId} player={player}/>
                })}
            </Stack>
        </Grid>
    )
}

export default Game;