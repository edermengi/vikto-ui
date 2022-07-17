import {Button, Grid} from "@mui/material";
import {Add, Groups} from "@mui/icons-material";


const Board = () => {

    return (
        <Grid sx={{pt: 4, pl: 4, pr: 4}}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Button variant="contained" sx={{width: '100%', height: 60}}
                            startIcon={<Add/>}>Создать игру</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" sx={{width: '100%', height: '100%'}}
                            startIcon={<Groups></Groups>}
                    >Присоединиться к игре</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Board;