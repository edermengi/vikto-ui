import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {gameActions, getUserName} from "../../app/gameSlice";
import store from "../../app/store";

export default function UserDialog() {
    const userName = useSelector(getUserName);
    const [open, setOpen] = useState(false);
    const [updUserName, setUpdUserName] = useState(userName);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const handleSave = () => {
        store.dispatch(gameActions.nameUpdated(updUserName));
        setOpen(false);
    };

    const updUserNameChange = (event) => {
        setUpdUserName(event.target.value);
    }


    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}><Avatar sx={{mr: 1}}/>{userName}</Button>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button onClick={handleCancel}>Отменить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}