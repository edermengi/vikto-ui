import {Badge, Box, Button, Grid, Paper, Stack, styled} from "@mui/material";
import {useSelector} from "react-redux";
import {
    gameActions,
    getActivePlayers,
    getAnswer,
    getGameState,
    getIsConnected,
    getQuestion,
    getReady
} from "../../app/gameSlice";
import {useParams} from "react-router-dom";
import store from "../../app/store";
import {useEffect} from "react";
import {Avataar} from "./Avataar";
import {ASK_QUESTION, SHOW_ANSWER, WAIT_START} from "../../app/constants";


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
    function calcColor(answerOption) {
        if (props.gameState === ASK_QUESTION) {
            return props.answer === answerOption.answer ? "cyan" : "lightcyan";
        } else if (props.gameState === SHOW_ANSWER) {
            if (answerOption.correct) {
                return "lightgreen";
            } else if (props.answer === answerOption.answer) {
                return "pink";
            } else {
                return "lightcyan";
            }
        }
    }

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
                        <Paper sx={{
                            height: 50,
                            backgroundColor: calcColor(answerOption),
                            textAlign: "center"
                        }}
                               elevation={4}
                               onClick={() => props.selectAnswer(answerOption.answer)}
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
    const answer = useSelector(getAnswer);
    let params = useParams();

    useEffect(() => {
        if (isConnected) {
            store.dispatch(gameActions.gameJoining({'gameId': params.gameId}));
        }
    }, [isConnected])

    function handleReady() {
        store.dispatch(gameActions.ready());
    }

    function selectAnswer(updAnswer) {
        if (gameState === ASK_QUESTION && !answer) {
            store.dispatch(gameActions.answer({'answer': updAnswer}));
        }
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
            {(gameState === ASK_QUESTION || gameState === SHOW_ANSWER) &&
                <QuestionView question={question} selectAnswer={selectAnswer} answer={answer} gameState={gameState}/>
            }
        </Grid>
    );
}

export default Game;