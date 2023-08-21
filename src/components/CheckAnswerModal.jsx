import {Button, Grid, Popover, Typography} from "@mui/material";

export const CheckAnswerModal = ({anchorEl, closeModal, nextQuestion, showAnswer, hasNextQuestion}) => {
    const open = Boolean(anchorEl);
    return (
        <Popover
            onClose={closeModal}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Grid container p={4} spacing={2}>
                <Grid item>
                    <Typography variant="h5">{anchorEl?.correct ? 'Answer correct!' : 'Answer incorrect!'}</Typography>
                </Grid>
                {anchorEl?.correct && (
                    <Grid item container spacing={2}>
                        {hasNextQuestion && (
                            <Grid item>
                                <Button onClick={nextQuestion} variant="contained">Next Question</Button>
                            </Grid>
                        )}
                        <Grid item>
                            <Button onClick={showAnswer} variant="contained">Show Answer</Button>
                        </Grid>

                    </Grid>
                )}
            </Grid>

        </Popover>
    )
}