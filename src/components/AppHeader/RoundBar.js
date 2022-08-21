import {useSelector} from "react-redux";
import {getQuestionNo, getRoundNo, getTotalNumberOfQuestions, getTotalNumberOfRounds} from "../../app/gameSlice";
import {Chip} from "@mui/material";

export default function RoundBar() {

    const questionNo = useSelector(getQuestionNo);
    const roundNo = useSelector(getRoundNo);
    const totalNumberOfRounds = useSelector(getTotalNumberOfRounds);
    const totalNumberOfQuestions = useSelector(getTotalNumberOfQuestions);

    return (
        <div>
            <Chip label={"Раунд " + roundNo + "/" + totalNumberOfRounds}/>
            <Chip label={"Вопрос " + questionNo + "/" + totalNumberOfQuestions}/>
        </div>
    );
}