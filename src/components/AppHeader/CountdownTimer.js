import {useSelector} from "react-redux";
import {getTimerSeconds} from "../../app/gameSlice";
import {useEffect, useRef, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";


function CircularProgressWithLabel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div">
                    {props.seconds}
                </Typography>
            </Box>
        </Box>
    );
}

export default function CountdownTimer() {
    const INTERVAL_SECONDS = 1;

    const timerSeconds = useSelector(getTimerSeconds);
    const intervalId = useRef(null);
    const updTimerSecondsRef = useRef(timerSeconds);
    const [updTimerSeconds, setUpdTimerSeconds] = useState(0)

    useEffect(() => {
        updTimerSecondsRef.current = timerSeconds
        setUpdTimerSeconds(timerSeconds);
        console.log("1 entry useEffect", timerSeconds, updTimerSecondsRef.current);
        if (intervalId.current) {
            console.log("2 Clear interval ");
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
        if (updTimerSecondsRef.current) {
            console.log("3 Set up interval");
            intervalId.current =
                setInterval(() => {
                        if (updTimerSecondsRef.current > 0) {
                            console.log("4 Update seconds ", updTimerSecondsRef.current);
                            updTimerSecondsRef.current -= INTERVAL_SECONDS;
                            setUpdTimerSeconds(updTimerSecondsRef.current);
                        } else {
                            console.log("5 Clear interval ");
                            clearInterval(intervalId.current);
                            intervalId.current = null;
                        }
                    },
                    INTERVAL_SECONDS * 1000);
        }
    }, [timerSeconds])


    return (
        <>
            {updTimerSeconds > 0 &&
                <CircularProgressWithLabel variant="determinate" color="secondary"
                                           value={100 - updTimerSeconds / timerSeconds * 100}
                                           seconds={updTimerSeconds}
                />
            }
        </>
    );
}