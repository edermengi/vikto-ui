import {Badge, Button, Chip, Grid, ImageList, ImageListItem, ImageListItemBar, Stack, styled} from "@mui/material";
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
    getTopicOptions,
    getWinners
} from "../../app/gameSlice";
import {useParams} from "react-router-dom";
import store from "../../app/store";
import {useEffect} from "react";
import {Avataar} from "./Avataar";
import {
    ASK_QUESTION,
    ASK_TOPIC,
    QUIZ_TYPE_SELECT_ONE, QUIZ_TYPE_TYPE_ONE, QUIZ_TYPE_TYPE_ONE_FROM_SET,
    SHOW_ANSWER,
    SHOW_TOPIC,
    SHOW_WINNER,
    WAIT_START
} from "../../app/constants";
import {CheckCircle} from "@mui/icons-material";
import SelectOneView from "./SelectOneView";
import TypeOneView from "./TypeOneView";
import TypeOneFromSetView from "./TypeOneFromSetView";


const StyledBadge = styled(Badge)(({bgcolor}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: bgcolor,
        color: bgcolor
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
            <Chip avatar={<Avataar wd={40} ht={40} avatarValue={props.player.avatar}></Avataar>}
                  label={props.player.userName}/>

        </StyledBadge>
        {props.gameState === WAIT_START &&
            <div>{props.player.ready ? "Готов" : "Ждет"}</div>
        }
        {props.gameState !== WAIT_START &&
            <div>
                <Chip label={props.player.score} size="small" color="info"
                      variant={(props.gameState === ASK_QUESTION && props.player.answered) ||
                      (props.gameState === ASK_TOPIC && props.player.topicVote) ? "" : "outlined"}/>
            </div>
        }
    </div>;
}


function AskTopicView(props) {

    function isVoted(topic) {
        for (const p of props.activePlayers) {
            if (p.topicVote === topic) {
                return true;
            }
        }
        return false;
    }


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
                                sx={{background: isVoted(topicOption.topic) ? "blue" : ""}}
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
    const winners = useSelector(getWinners);
    let params = useParams();

    useEffect(() => {
        if (isConnected) {
            store.dispatch(gameActions.gameJoining({'gameId': params.gameId}));
        }
    }, [isConnected, params.gameId])

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
                <>
                    {
                        question.quizType === QUIZ_TYPE_SELECT_ONE &&
                        <SelectOneView question={question} selectAnswer={selectAnswer} answer={answer}
                                       gameState={gameState}/>
                    }
                    {
                        question.quizType === QUIZ_TYPE_TYPE_ONE &&
                        <TypeOneView question={question} selectAnswer={selectAnswer} answer={answer}
                                     gameState={gameState} activePlayers={activePlayers}/>
                    }
                    {
                        question.quizType === QUIZ_TYPE_TYPE_ONE_FROM_SET &&
                        <TypeOneFromSetView question={question} selectAnswer={selectAnswer} answer={answer}
                                     gameState={gameState} activePlayers={activePlayers}/>
                    }
                </>
            }
            {(gameState === ASK_TOPIC) &&
                <AskTopicView topicOptions={topicOptions} gameState={gameState} topic={topic}
                              selectTopic={selectTopic} activePlayers={activePlayers}/>
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