import {useSelector} from "react-redux";
import {getTimerSeconds} from "../../app/gameSlice";
import {useEffect, useRef, useState} from "react";

export default function CountdownTimer() {
    const INTERVAL_SECONDS = 1;

    const timerSeconds = useSelector(getTimerSeconds);
    let intervalId = null;
    const updTimerSecondsRef = useRef(timerSeconds);
    const [updTimerSeconds, setUpdTimerSeconds] = useState(0)

    useEffect(() => {
        updTimerSecondsRef.current = timerSeconds
        setUpdTimerSeconds(timerSeconds);
        console.log("1 entry useEffect", timerSeconds, updTimerSecondsRef.current);
        if (intervalId) {
            console.log("2 Clear interval ");
            clearInterval(intervalId);
            intervalId = null;
        }
        if (updTimerSecondsRef.current) {
            console.log("3 Set up interval");
            intervalId =
                setInterval(() => {
                        if (updTimerSecondsRef.current > 0) {
                            console.log("4 Update seconds ", updTimerSecondsRef.current);
                            updTimerSecondsRef.current -= INTERVAL_SECONDS;
                            setUpdTimerSeconds(updTimerSecondsRef.current);
                        } else {
                            console.log("5 Clear interval ");
                            clearInterval(intervalId);
                            intervalId = null;
                        }
                    },
                    INTERVAL_SECONDS * 1000);
        }
    }, [timerSeconds])


    return (
        <>{updTimerSeconds > 0 && updTimerSeconds}</>
    );
}