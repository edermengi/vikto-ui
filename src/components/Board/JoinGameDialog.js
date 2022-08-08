import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function JoinGameDialog(props) {
    const {show, toggleShow} = props
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate();

    const handleJoin = () => {
        toggleShow();
        navigate("game/" + gameId, {replace: true});
    };

    const updGameId = (event) => {
        setGameId(event.target.value);
    }

    return (
        <Dialog
            open={show} onClose={toggleShow}>
            <DialogTitle>Игра</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={gameId}
                    onChange={updGameId}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleJoin}>Присоединиться</Button>
                <Button onClick={toggleShow}>Отменить</Button>
            </DialogActions>
        </Dialog>
    );
}
