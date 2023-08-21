import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthProvider";
import {
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box, LinearProgress
} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import logo from "../logos/small-logo.png";
import {QuestionsContainer} from "../components/QuestionsContainer";
import {get} from "../api/api";


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
    }

}));

function LinearProgressWithLabel({total, answered}) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }} pt={2}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={Math.round(answered / total * 100)} />
            </Box>
            <Box sx={{ minWidth: 50 }}>
                <Typography variant="body2" color="text.secondary">{answered} / {total}</Typography>
            </Box>
        </Box>
    );
}

export const QuestionsPage = () => {
    const { setAppToken } = useContext(AuthContext);
    const theme = useTheme();
    const classes = useStyles();
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [topic, setTopic] = useState('');
    const [chapter, setChapter] = useState('');
    const [answeredQuestions, setAnsweredQuestions] = useState(0);

    const showQuestions = !!filters && questions.length;

    const handleSetTopic = (e) => {
        setTopic(e.target.value);
        setQuestions([]);
    }

    const handleSetChapter = (e) => {
        setChapter(e.target.value);
        setQuestions([]);
    }

    useEffect(() => {
        (async () => {
            try {
                const receivedFilters = await get('/api/questions/filters');
                setFilters(receivedFilters)
            } catch (e) {
                console.log(e.message);
            }

        })()
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const receivedQuestions = await get(`/api/questions?topic=${topic}&chapter=${chapter}`);
            setQuestions(receivedQuestions);
            setAnsweredQuestions(0);
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    }

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
            <Grid item container spacing={4} mt={2} pl={4}>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="topic-select">Topic</InputLabel>
                            <Select
                                labelId="topic-select"
                                label="Topic"
                                disabled={!filters || loading}
                                value={topic}
                                onChange={handleSetTopic}
                            >
                                {filters && filters.topics.map(t => (
                                    <MenuItem value={t}>{t}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <InputLabel id="chapter-select">Chapter</InputLabel>
                            <Select
                                labelId="chapter-select"
                                label="Chapter"
                                disabled={!topic || loading}
                                value={chapter}
                                onChange={handleSetChapter}
                            >
                                {filters && topic && filters[topic].map(ch => (
                                    <MenuItem value={ch}>{ch}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item container alignItems="center" xs={2}>
                        <Button
                            disabled={!topic || !chapter || loading}
                            className={classes.searchButton}
                            variant="outlined"
                            onClick={fetchQuestions}
                        >
                            Search
                        </Button>
                    </Grid>
                    {!!questions.length && (
                        <Grid item xs={5}>
                            <LinearProgressWithLabel total={questions?.length} answered={answeredQuestions} />
                        </Grid>
                    )}
            </Grid>
            {!!showQuestions && (
                <Grid item mt={4} pl={4} pr={4}>
                    <QuestionsContainer
                        questions={questions}
                        topic={topic}
                        chapter={chapter}
                        setAnsweredQuestions={setAnsweredQuestions}
                    />
                </Grid>
            )}

        </Grid>
    )
}