import {
    Badge,
    Box,
    Button,
    Chip,
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Paper,
    Stack,
    styled
} from "@mui/material";
import {useSelector} from "react-redux";
import {
    gameActions,
    getActivePlayers,
    getAnswer,
    getGameState,
    getIsConnected,
    getQuestion,
    getReady,
    getTopic,
    getTopicOptions, getWInners
} from "../../app/gameSlice";
import {useParams} from "react-router-dom";
import store from "../../app/store";
import {useEffect} from "react";
import {Avataar} from "./Avataar";
import {ASK_QUESTION, ASK_TOPIC, SHOW_ANSWER, SHOW_TOPIC, SHOW_WINNER, WAIT_START} from "../../app/constants";
import {CheckCircle} from "@mui/icons-material";
import * as PropTypes from "prop-types";


const StyledBadge = styled(Badge)((props) => ({
    '& .MuiBadge-badge': {
        backgroundColor: props.bgcolor,
        color: props.bgcolor
    }
}));


function PlayerItem(props) {
    return <div key={props.player.userId}>
        <StyledBadge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="dot"
            bgcolor={props.player.online ? "#44b700" : "#a6a6a6"}
        >
            <Avataar wd={45} ht={45} avatarValue={props.player.avatar}></Avataar>
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
            <h4 style={{color: "grey", marginBottom: 0, marginTop: 0}}>Тема: {props.question.title}</h4>
            <h3 style={{marginTop: 0, marginBottom: 2}}>{props.question.question}</h3>
            {props.question.questionItemType !== 'image' ?
                <h2 style={{color: "blue"}}>{props.question.questionItem}</h2>
                :
                <img style={{width: "40%", marginTop: 0}}
                     src={props.question.questionItem}></img>
            }

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
                            <Grid container>
                                <Grid item xs={11}>
                                    <span style={{
                                        display: "inline-block",
                                        lineHeight: "40px"
                                    }}>{answerOption.answer}</span>

                                </Grid>
                                <Grid item xs={1}>
                                    {props.gameState === SHOW_ANSWER && answerOption.answerNo !== "0" &&
                                        <Chip sx={{marginTop: 1}} label={answerOption.answerNo}/>
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                })
                }

            </Box>
        </Grid>
    );
}

function AskTopicView(props) {
    return (
        <Grid>
            <h1 style={{color: "darkcyan"}}>Начинаем новый раунд. Выберите тему</h1>
            <ImageList sx={{width: "100%"}}
                       variant="quilted"
                       cols={3}
                       rowHeight={121}>
                {props.topicOptions.map(topicOption => {
                    return (
                        <ImageListItem key={topicOption.topic} onClick={() => props.selectTopic(topicOption.topic)}>
                            <img src={topicOption.image} alt={topicOption.title} loading="lazy"/>
                            <ImageListItemBar
                                title={<span style={{
                                    fontSize: "1.5rem",
                                    color: "lightgoldenrodyellow"
                                }}>{topicOption.title}</span>}
                                actionIcon={props.gameState === ASK_TOPIC && props.topic === topicOption.topic &&
                                    <CheckCircle sx={{color: "lightgreen"}}/>
                                }
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </Grid>
    );
}

function ShowTopicView(props) {
    return (
        <Grid>
            <h1 style={{color: "darkcyan"}}>Тема раунда</h1>
            <ImageList sx={{width: "200"}}
                       variant="quilted"
                       cols={1}
                       rowHeight={200}>
                <ImageListItem>
                    <img src={props.topic.image} alt={props.topic.title} loading="lazy"/>
                    <ImageListItemBar
                        title={<span style={{
                            fontSize: "2rem",
                            color: "lightgoldenrodyellow"
                        }}>{props.topic.title}</span>}
                    />
                </ImageListItem>
            </ImageList>
        </Grid>
    );
}


function WinnerView(props) {
    return (
        <Stack direction="row">
            <h1 style={{color: "darkorange", marginTop: 70}}>В игре побеждает!</h1>
            {props.winners.map(winner => {
                return (
                    <Grid>
                        <Avataar wd={150} ht={150} avatarValue={winner.avatar}></Avataar>
                        <h2>{winner.userName}</h2>
                    </Grid>
                );
            })}
        </Stack>
    );
}

const Game = () => {

    const activePlayers = useSelector(getActivePlayers);
    const gameState = useSelector(getGameState);
    const question = useSelector(getQuestion);
    const isConnected = useSelector(getIsConnected);
    const ready = useSelector(getReady);
    const answer = useSelector(getAnswer);
    const topic = useSelector(getTopic);
    const topicOptions = useSelector(getTopicOptions);
    const winners = useSelector(getWInners);
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

    function selectTopic(updTopic) {
        if (gameState === ASK_TOPIC) {
            store.dispatch(gameActions.chooseTopic({'topic': updTopic}));
        }
    }

    return (
        <Grid sx={{pt: 1, pl: 4, pr: 4}}>
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
            {(gameState === ASK_TOPIC) &&
                <AskTopicView topicOptions={topicOptions} gameState={gameState} topic={topic}
                              selectTopic={selectTopic}/>
            }
            {(gameState === SHOW_TOPIC) &&
                <ShowTopicView topic={topic}/>
            }
            {(gameState === SHOW_WINNER) &&
                <WinnerView winners={winners}/>
            }
        </Grid>
    );
}

export default Game;