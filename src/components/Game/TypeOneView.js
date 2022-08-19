import {Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {ASK_QUESTION, SHOW_ANSWER} from "../../app/constants";

export default function TypeOneView(props) {
    const [updAnswer, setUpdAnswer] = useState("")

    function renderBr(answerHint) {
        return answerHint.replaceAll('<br>', '\n');
    }

    return (
        <Grid>
            <h4 style={{color: "grey", marginBottom: 0, marginTop: 0}}>Тема: {props.question.title}</h4>
            <h3 style={{marginTop: 0, marginBottom: 2}}>{props.question.question}</h3>
            <h1 style={{color: "darkblue"}}>
                <code>{props.gameState === ASK_QUESTION ? props.question.answerHint : props.question.answer}</code></h1>
            <div>
                <pre><code>{renderBr(props.question.questionItem)}</code></pre>
            </div>
            {(props.gameState === ASK_QUESTION) &&
                <Grid>
                    <TextField
                        color="primary" focused fullWidth value={updAnswer}
                        onChange={e => setUpdAnswer((e.target.value))}/>
                    <Button onClick={() => props.selectAnswer("")}>Сдаюсь</Button>
                    <Button onClick={() => props.selectAnswer(updAnswer)}>Отправить</Button>
                </Grid>
            }
            {(props.gameState === SHOW_ANSWER) &&
                <Grid>
                    Ответы
                </Grid>
            }
        </Grid>
    );
}
