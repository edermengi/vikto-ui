import {Button, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {ASK_QUESTION, SHOW_ANSWER} from "../../app/constants";

function GuessWord({puzzleWord, guessWord, gameState, answer}) {

    function mergedPuzzleGuessChars(puzzle, guess) {
        const puzzleChars = [...puzzle.toUpperCase()];
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

            } else {
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
            {gameState === ASK_QUESTION &&
                <h1 style={{color: "darkblue"}}><code>
                    {mergedPuzzleGuessChars(puzzleWord, guessWord).map((chItem, i) => {
                        return <span style={{color: chItem.color}} key={chItem + i}>{chItem.ch}</span>
                    })}
                </code></h1>
            }
            {gameState === SHOW_ANSWER &&
                <h1 style={{color: "darkblue"}}><code>{answer}</code></h1>
            }
        </>
    );
}

export default function TypeOneView(
    {
        question,
        answer,
        gameState,
        selectAnswer
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

    return (
        <Grid>
            <h4 style={{color: "grey", marginBottom: 0, marginTop: 0}}>Тема: {question.title}</h4>
            <h3 style={{marginTop: 0, marginBottom: 2}}>{question.question}</h3>
            <GuessWord puzzleWord={question.answerHint}
                       guessWord={updAnswer}
                       gameState={gameState}
                       answer={question.answer}
            />
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
            {(gameState === SHOW_ANSWER) &&
                <Grid>
                    Ответы
                </Grid>
            }
        </Grid>
    );
}
