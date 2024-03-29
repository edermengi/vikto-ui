import {Button, Chip, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {ASK_QUESTION, SHOW_ANSWER} from "../../app/constants";
import {Avataar} from "./Avataar";

export function GuessWord({puzzleWord, guessWord, showGuessOnly}) {

    function mergedPuzzleGuessChars(puzzle, guess) {
        const puzzleChars = puzzle ? [...puzzle.toUpperCase()] : [];
        const guessChars = guess ? [...guess.toUpperCase()] : [];
        const mergedChars = Array(Math.max(puzzleChars.length, guessChars.length));

        let i = 0;
        for (const puzzleCh of puzzleChars) {
            if (i < guessChars.length) {
                if (puzzleCh === '.') {
                    mergedChars[i] = {
                        "ch": guessChars[i],
                        "color": "gray"
                    };
                } else {
                    mergedChars[i] = {
                        "ch": guessChars[i],
                        "color": puzzleCh === guessChars[i] ? "green" : "red"
                    };
                }
            } else if (!showGuessOnly) {
                mergedChars[i] = {
                    "ch": puzzleCh,
                    "color": "darkblue"
                };
            }
            i++;
        }
        for (; i < guessChars.length; i++) {
            mergedChars[i] = {
                "ch": guessChars[i],
                "color": "red"
            }
        }

        return mergedChars;
    }

    return (
        <>
            <h1 style={{color: "darkblue"}}><code>
                {mergedPuzzleGuessChars(puzzleWord, guessWord).map((chItem, i) => {
                    return <span style={{color: chItem.color}} key={chItem + i}>{chItem.ch}</span>
                })}
            </code></h1>
        </>
    );
}

export default function TypeOneView(
    {
        question,
        answer,
        gameState,
        selectAnswer,
        activePlayers
    }) {

    const [updAnswer, setUpdAnswer] = useState('')

    function renderBr(answerHint) {
        return answerHint.replaceAll('<br>', '\n');
    }

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

    return (
        <Grid>
            <h4 style={{color: "grey", marginBottom: 0, marginTop: 0}}>Тема: {question.title}</h4>
            <h3 style={{marginTop: 0, marginBottom: 2}}>{question.question}</h3>
            {gameState === ASK_QUESTION &&
                <GuessWord puzzleWord={question.answerHint}
                           guessWord={updAnswer}
                />
            }
            {gameState === SHOW_ANSWER &&
                <GuessWord puzzleWord={question.answer}
                           guessWord=''
                />
            }
            <pre style={{whiteSpace: "pre-wrap"}}><code>{renderBr(question.questionItem)}</code></pre>
            {(gameState === ASK_QUESTION) &&
                <Grid>
                    <TextField
                        inputProps={{style: {letterSpacing: "1em", textTransform: "uppercase"}, spellCheck: false}}
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
                                    <GuessWord puzzleWord={question.answer}
                                               guessWord={playerAnswer.answer}
                                               showGuessOnly={true}
                                    />
                                }
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
