import {useSelector} from "react-redux";
import {
    getGameState,
    getQuestionNo,
    getRoundNo,
    getTotalNumberOfQuestions,
    getTotalNumberOfRounds
} from "../../app/gameSlice";
import {Chip} from "@mui/material";

export default function RoundBar() {

    const gameState = useSelector(getGameState);
    const questionNo = useSelector(getQuestionNo);
    const roundNo = useSelector(getRoundNo);
    const totalNumberOfRounds = useSelector(getTotalNumberOfRounds);
    const totalNumberOfQuestions = useSelector(getTotalNumberOfQuestions);

    if (gameState) {
        return <div>
            <Chip label={"Раунд " + roundNo + "/" + totalNumberOfRounds}/>
            <Chip label={"Вопрос " + questionNo + "/" + totalNumberOfQuestions}/>
        </div>;
    } else {
        return <></>;
    }
}