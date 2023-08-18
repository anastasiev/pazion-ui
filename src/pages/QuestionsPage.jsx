import {useContext} from "react";
import {AuthContext} from "../AuthProvider";
import {Grid, Paper, TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import logo from "../logos/small-logo.png";

const useStyles = makeStyles(() => ({
    logo: {
        width: '66px',
        height: '60px'
    },
    paper: {
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    searchButton: {
        height: '100%'
    },
    container: {
        marginTop: '20px'
    }

}));

export const QuestionsPage = () => {
    const { setAppToken } = useContext(AuthContext);
    const theme = useTheme();
    const classes = useStyles();
    return (
        <Grid container xs={12} direction="column">
            <Grid item>
                <Paper className={ classes.paper} sx={{backgroundColor: theme.palette.secondary.light}}>
                    <Grid container xs={12} alignItems="center" justifyContent="space-between">
                        <img className={classes.logo} src={logo} alt="logo"/>
                        <Button variant="contained" onClick={() => setAppToken('')}>Logout</Button>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item container spacing={4}>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="topic-select">Age</InputLabel>
                            <Select
                                labelId="topic-select"
                                label="Topic"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="chapter-select">Age</InputLabel>
                            <Select
                                labelId="chapter-select"
                                label="Chapter"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item container alignItems="center" xs={2}>
                        <Button className={classes.searchButton} variant="outlined">Search</Button>
                    </Grid>
            </Grid>
        </Grid>
    )
}