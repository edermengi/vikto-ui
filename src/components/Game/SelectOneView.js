import {ASK_QUESTION, SHOW_ANSWER} from "../../app/constants";
import {Box, Chip, Grid, Paper} from "@mui/material";

export default function SelectOneView(props) {
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
