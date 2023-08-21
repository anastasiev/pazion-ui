import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useMemo} from "react";

const useStyles = makeStyles(() => ({
    answerImg: {
        width: '100%',
        height: '780px',
    },
    container: {
        overflowY: "scroll"
    }

}));

export const Answer = ({question}) => {
    const classes = useStyles();
    const answerUri = useMemo(() => {
        const [,topic, chapter,,answerFileName] = question.question.split('/');
        return `/${topic}/${chapter}/answers/${answerFileName}`;
    }, [question]);
    return (
        <Grid item container xs={10} direction="column" className={classes.container}>
            <Grid item>
                <img className={classes.answerImg} src={answerUri}/>
            </Grid>
        </Grid>
    )
}