import {
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Tab,
    Tabs,
} from "@mui/material";
import {useEffect, useState} from "react";
import {Question} from "./Question";
import {Answer} from "./Answer";
import {post} from "../api/api";
import {CheckAnswerModal} from "./CheckAnswerModal";

const QUESTION = 'question';
const ANSWER = 'answer';

export const QuestionsContainer = ({questions, chapter, setAnsweredQuestions}) => {
    const [selectedTab, setSelectedTab] = useState(QUESTION)
    const [questionsObjects, setQuestionObjects] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [anchorEl, setAnchor] = useState(null);

    useEffect(() => {
        const objects = questions.map((q, index) => ({
            question: q,
            answered: false,
            disabled: true,
            answer: null,
            index
        }));
        objects[0].disabled = false;
        setQuestionObjects(objects);
        setCurrentQuestion(objects[0]);
    }, [questions]);

    const closeModal = () => setAnchor(null);

    const checkAnswer = async (answer, target) => {
        try {
            const response = await post(
                '/api/questions/answer',
                {question: currentQuestion.question, answer}
            );
            if(response.correct) {
                target.correct = true;
                const newQuestionsObjects = [...questionsObjects];
                newQuestionsObjects[currentQuestion.index] = {
                    ...currentQuestion,
                    answered: true,
                    disabled: false,
                    answer
                }
                if (currentQuestion.index + 1 !== questions.length) {
                    newQuestionsObjects[currentQuestion.index + 1].disabled = false;
                }
                setQuestionObjects(newQuestionsObjects);
                setCurrentQuestion(newQuestionsObjects[currentQuestion.index]);
                setAnsweredQuestions(prevValue => prevValue + 1);
            } else {
                target.correct = false;
            }
            setAnchor(target);
        } catch (e) {
            console.log(e)
        }
    }

    const showAnswer = () => {
        setSelectedTab(ANSWER);
        closeModal();
    }

    const handleListItemClick = (ind) => {
        setCurrentQuestion(
            {...questionsObjects[ind]}
        );
        setSelectedTab(QUESTION);
    }
    const nextQuestion = () => {
        if (currentQuestion.index + 1 !== questions.length) {
            setCurrentQuestion(
                {...questionsObjects[currentQuestion.index + 1]}
            );
            closeModal();
            setSelectedTab(QUESTION);
        }
    }

    return (
        <Paper>
            <Grid container direction="column" xs={12} pl={2} pr={2} pb={2}>
                <Grid item container justifyContent="end" >
                    <Grid item xs={6}>
                        <Tabs variant="fullWidth" value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                            <Tab label="Question" value={QUESTION}/>
                            <Tab label="Answer" value={ANSWER} disabled={!currentQuestion.answered} />
                        </Tabs>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="space-between" direction="row" mt={2}>
                    <Grid item xs={2}>
                        <List
                            sx={{
                                maxHeight: 450,
                                overflowY: 'scroll'
                            }}
                        >
                            {questionsObjects.map((q, ind) => (
                                <ListItemButton
                                    selected={q.question === currentQuestion.question}
                                    disabled={q.disabled}
                                    onClick={() => handleListItemClick(ind)}
                                >
                                    <ListItemText
                                        primary={`Question ${ind + 1}`}
                                        secondary={chapter}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Grid>
                    {selectedTab === QUESTION && <Question question={currentQuestion} checkAnswer={checkAnswer}/>}
                    {selectedTab === ANSWER && <Answer question={currentQuestion}/>}
                    {anchorEl && (
                        <CheckAnswerModal
                            anchorEl={anchorEl}
                            closeModal={closeModal}
                            hasNextQuestion={currentQuestion.index + 1 !== questions.length}
                            showAnswer={showAnswer}
                            nextQuestion={nextQuestion}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    )
}