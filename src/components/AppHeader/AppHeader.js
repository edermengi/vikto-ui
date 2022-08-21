import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getIsConnected} from "../../app/gameSlice";
import {WbSunny} from "@mui/icons-material";
import UserDialog from "../UserDialog/UserDialog";
import {NavLink} from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import RoundBar from "./RoundBar";

const AppHeader = () => {

    const isConnected = useSelector(getIsConnected);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <WbSunny color={isConnected ? "success" : "disabled"}/>
                    <CountdownTimer/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <NavLink to="/" className="no-decoration">
                            Викторина
                        </NavLink>
                    </Typography>
                    <RoundBar/>
                    <UserDialog></UserDialog>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader;