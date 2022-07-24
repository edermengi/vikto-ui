import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getIsConnected} from "../../app/gameSlice";
import {WbSunny} from "@mui/icons-material";
import UserDialog from "../UserDialog/UserDialog";

const AppHeader = () => {

    const isConnected = useSelector(getIsConnected);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <WbSunny color={isConnected ? "success" : "disabled"}/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Викторина
                    </Typography>
                    <UserDialog></UserDialog>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader;