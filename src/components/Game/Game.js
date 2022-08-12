import {Badge, Grid, Stack, styled} from "@mui/material";
import {useSelector} from "react-redux";
import {gameActions, getActivePlayers, getIsConnected} from "../../app/gameSlice";
import {useParams} from "react-router-dom";
import store from "../../app/store";
import {useEffect} from "react";
import {Avataar} from "./Avataar";


const StyledBadge = styled(Badge)((props) => ({
    '& .MuiBadge-badge': {
        backgroundColor: props.bgcolor,
        color: props.bgcolor
    }
}));

const gameNameStyle = {
    color: 'blue'
};

const playerNoStyle = {
    color: 'red'
};

function PlayerItem(props) {
    return <div key={props.player.userId}>
        <StyledBadge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="dot"
            bgcolor={props.player.online ? "#44b700" : "#a6a6a6"}
        >
            <Avataar wd={60} ht={60} avatarValue={props.player.avatar}></Avataar>
        </StyledBadge>
        <div>{props.player.userName}</div>
        <div>{props.player.score}</div>
    </div>;
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
            <div>В игре <span style={gameNameStyle}>{params.gameId}</span> учавствуют <span
                style={playerNoStyle}>{activePlayers.length}</span> человек
            </div>
            <Stack direction="row" spacing={2}>
                {activePlayers.map(player => {
                    return <PlayerItem key={player.userId} player={player}/>
                })}
            </Stack>
        </Grid>
    )
}

export default Game;