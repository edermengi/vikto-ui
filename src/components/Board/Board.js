import {useState} from "react";
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

function randomUserName() {
    return 'User ' + Math.floor(Math.random() * 100);
}


const Board = () => {

    const [userName, setUserName] = useState(randomUserName)
    const [introduced, setIntroduced] = useState(false)

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <List>
                    <ListItem key={1}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar/>
                            </ListItemAvatar>
                            <ListItemText primary={userName}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>

        </Grid>
    )
}

export default Board;