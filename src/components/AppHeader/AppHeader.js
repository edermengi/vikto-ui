import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {getUserName} from "../../app/gameSlice";

const AppHeader = () => {

    const userName = useSelector(getUserName);

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
                        Викторина
                    </Typography>

                    <Button color="inherit"><Avatar sx={{mr: 1}}/>{userName}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader;