import {Badge, Box, Button, Grid, Paper, Stack, styled} from "@mui/material";
import {useSelector} from "react-redux";
import {gameActions, getActivePlayers, getGameState, getIsConnected, getQuestion, getReady} from "../../app/gameSlice";
import {useParams} from "react-router-dom";
import store from "../../app/store";
import {useEffect} from "react";
import {Avataar} from "./Avataar";


const WAIT_START = 'WAIT_START';
const ASK_QUESTION = 'ASK_QUESTION';
const SHOW_ANSWER = 'SHOW_ANSWER';
const SHOW_WINNER = 'SHOW_WINNER';

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
        {props.gameState === WAIT_START &&
            <div>{props.player.ready ? "Готов" : "Ждет"}</div>
        }
        {props.gameState !== WAIT_START &&
            <div>{props.player.score}</div>
        }
    </div>;
}


function QuestionView(props) {
    return (
        <Grid>
            <h4 style={{color: "grey", marginBottom: 0}}>Тема: {props.question.title}</h4>
            <h3 style={{marginTop: 0}}>{props.question.question}</h3>
            <h2 style={{color: "blue"}}>{props.question.questionItem}</h2>
            <Box
                sx={{
                    p: 1,
                    display: 'grid',
                    gridTemplateColumns: {md: '1fr 1fr'},
                    gap: 1,
                }}
            >
                {props.question.answerOptions.map(answerOption => {
                    return (
                        <Paper sx={{height: 50, backgroundColor: "lightcyan", textAlign: "center"}}
                               elevation={4}
                               key={answerOption.answer}>
                            <span style={{
                                verticalAlign: "middle",
                                display: "inline-block",
                                justifyContent: "center",
                                lineHeight: "40px"
                            }}>{answerOption.answer}</span>

                        </Paper>
                    );
                })
                }

            </Box>
        </Grid>
    );
}

const Game = () => {

    const activePlayers = useSelector(getActivePlayers);
    const gameState = useSelector(getGameState);
    const question = useSelector(getQuestion);
    const isConnected = useSelector(getIsConnected);
    const ready = useSelector(getReady);
    let params = useParams();

    useEffect(() => {
        if (isConnected) {
            store.dispatch(gameActions.gameJoining({'gameId': params.gameId}));
        }
    }, [isConnected])

    function handleReady() {
        store.dispatch(gameActions.ready());
    }

    return (
        <Grid sx={{pt: 1, pl: 4, pr: 4}}>
            <div>В игре <span style={gameNameStyle}>{params.gameId}</span> учавствуют <span
                style={playerNoStyle}>{activePlayers.length}</span> человек
            </div>
            <Stack direction="row" spacing={1} sx={{pt: 1}}>
                {activePlayers.map(player => {
                    return <PlayerItem key={player.userId} player={player} gameState={gameState}/>
                })}
            </Stack>
            {gameState === WAIT_START && !ready && activePlayers.length > 0 &&
                <Grid>
                    <Button variant="contained" sx={{width: '80%', height: 60}} onClick={handleReady}>Готов к
                        игре</Button>
                </Grid>
            }
            {gameState === ASK_QUESTION && <QuestionView question={question}></QuestionView>}
        </Grid>
    );
}

export default Game;