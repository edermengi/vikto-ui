import {Button, Chip, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {ASK_QUESTION, SHOW_ANSWER} from "../../app/constants";
import {Avataar} from "./Avataar";
import {GuessWord} from "./TypeOneView";


export default function TypeOneFromSetView(
    {
        question,
        answer,
        gameState,
        selectAnswer,
        activePlayers
    }) {

    const [updAnswer, setUpdAnswer] = useState('')

    function handleUpdAnswer(e) {
        setUpdAnswer((e.target.value));
    }

    useEffect(() => {
        if (!answer) {
            setUpdAnswer('');
        }
    }, [answer]);

    function getPlayerById(userId) {
        for (const p of activePlayers) {
            if (p.userId === userId) {
                return p;
            }
        }
        return {};
    }

    function renderAnswer(answer) {
        return answer.replaceAll(",", ", ");
    }

    return (
        <Grid>
            <h4 style={{color: "grey", marginBottom: 0, marginTop: 0}}>Тема: {question.title}</h4>
            <h3 style={{marginTop: 0, marginBottom: 2}}>{question.question}</h3>
            {gameState === ASK_QUESTION &&
                <h1 style={{color: "darkblue"}}><code>
                    {question.questionItem}
                </code></h1>
            }
            {gameState === SHOW_ANSWER &&
                <div>
                    <GuessWord puzzleWord={question.questionItem}
                               guessWord=''
                    />
                    <pre style={{whiteSpace: "pre-wrap"}}><code>{renderAnswer(question.answer)}</code></pre>
                </div>
            }
            {(gameState === ASK_QUESTION) &&
                <Grid>
                    <TextField
                        inputProps={{style: {textTransform: "uppercase"}, spellCheck: false}}
                        color="primary" focused fullWidth value={updAnswer}
                        onChange={handleUpdAnswer}/>
                    <Button onClick={() => selectAnswer("")}>Сдаюсь</Button>
                    <Button onClick={() => selectAnswer(updAnswer)}>Отправить</Button>
                </Grid>
            }
            {gameState === SHOW_ANSWER &&
                question.playerAnswers.map((playerAnswer) => {
                    const player = getPlayerById(playerAnswer.userId);

                    return (
                        <Grid container justifyContent="center" spacing={2} alignItems="center">
                            <Grid item>
                                <Avataar wd={30} ht={30} avatarValue={player.avatar}></Avataar>
                            </Grid>
                            <Grid item>
                                {playerAnswer.answer &&
                                    <GuessWord puzzleWord={playerAnswer.bestMatch}
                                               guessWord={playerAnswer.answer}
                                               showGuessOnly={true}
                                    />
                                }
                            </Grid>
                            <Grid item>
                                <pre style={{whiteSpace: "pre-wrap"}}><code>{playerAnswer.bestMatch}</code></pre>
                            </Grid>
                            <Grid item>
                                <Chip label={playerAnswer.score} size="Big" color="success"/>
                            </Grid>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}
