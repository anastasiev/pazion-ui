import {Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    questionImg: {
        width: '100%'
    },
}));

export const Question = ({question, checkAnswer}) => {
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChangeOption = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleCheckClick = (event) => {
        checkAnswer(selectedOption, event.target)
    }
    useEffect(() => {
        setSelectedOption(question.answer);
    }, [question.answer]);
    return (
        <Grid item container xs={10} direction="column">
            <Grid item>
                <img className={classes.questionImg} src={`/static${question.question}`}/>
            </Grid>
            <Grid item container pl={10} pt={4}>
                <Paper>
                    <Grid container p={4}>
                        <FormControl>
                            <RadioGroup
                                row
                                value={selectedOption}
                                onChange={handleChangeOption}
                            >
                                <FormControlLabel value="a" control={<Radio />} label="A" />
                                <FormControlLabel value="b" control={<Radio />} label="B" />
                                <FormControlLabel value="c" control={<Radio />} label="C" />
                                <FormControlLabel value="d" control={<Radio />} label="D" />
                            </RadioGroup>
                        </FormControl>
                        <Button disabled={!selectedOption} variant="contained" onClick={handleCheckClick}>Check</Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}