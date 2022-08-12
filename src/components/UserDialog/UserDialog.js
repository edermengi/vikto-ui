import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {gameActions, getAvatar, getUserName} from "../../app/gameSlice";
import store from "../../app/store";
import {Avataar, randomAvatarValue} from "../Game/Avataar";
import {Refresh} from "@mui/icons-material";

export default function UserDialog() {
    const userName = useSelector(getUserName);
    const avatar = useSelector(getAvatar);
    const [open, setOpen] = useState(false);
    const [updUserName, setUpdUserName] = useState(userName);
    const [updAvatar, setUpdAvatar] = useState(avatar);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const handleSave = () => {
        store.dispatch(gameActions.nameUpdated({'userName': updUserName, 'avatar': updAvatar}));
        setOpen(false);
    };

    const updUserNameChange = (event) => {
        setUpdUserName(event.target.value);
    }

    const handleRandomizeAvatar = () => {
        setUpdAvatar(randomAvatarValue());
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>
                <Avataar sx={{mr: 1}} wd={40} ht={40} avatarValue={avatar}/>{userName}</Button>
            <Dialog
                fullWidth
                open={open} onClose={handleCancel}>
                <DialogTitle>Профиль</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updUserName}
                        onChange={updUserNameChange}
                    />
                    <Grid sx={{marginTop: 1}}
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                    >
                        <Avataar wd={200} ht={200} avatarValue={updAvatar}></Avataar>
                        <Button variant="contained" startIcon={<Refresh></Refresh>}
                                color="success"
                                onClick={handleRandomizeAvatar}>Random</Button>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Отменить</Button>
                    <Button onClick={handleSave} variant="contained">Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}