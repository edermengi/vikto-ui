import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {getUserName} from "../../app/gameSlice";
import {useSelector} from "react-redux";


const Board = () => {

    const userName = useSelector(getUserName);

    return (
        <Grid>
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
        </Grid>
    )
}

export default Board;