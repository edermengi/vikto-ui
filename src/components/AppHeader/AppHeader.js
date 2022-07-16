import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {WebSocketContext} from '../WebSockets/WebSocket';
import {useContext} from "react";

const AppHeader = () => {
    const ws = useContext(WebSocketContext);

    function clickTest(ev) {
        ws.sendMessage('abc', {message: 'Hi there'})
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Viktorina
                    </Typography>
                    <Button color="inherit" onClick={clickTest}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader;