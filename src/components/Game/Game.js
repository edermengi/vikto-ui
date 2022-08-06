import {Grid, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {getActivePlayers} from "../../app/gameSlice";


function PlayerItem(props) {
    return props.player.userName;
}


const Game = () => {

    const activePlayers = useSelector(getActivePlayers);

    return (
        <Grid sx={{pt: 4, pl: 4, pr: 4}}>
            <Stack direction="row" spacing={2}>
                {activePlayers.map(player => {
                    return <PlayerItem player={player}/>
                })}
            </Stack>
        </Grid>
    )
}

export default Game;