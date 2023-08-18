import {useContext, useState} from "react";
import {post} from "../api/api";
import {AuthContext} from "../AuthProvider";
import Button from '@mui/material/Button';
import {Grid, Paper, TextField, Typography} from "@mui/material";
import logo from '../logos/login-logo.png';
import {makeStyles, useTheme} from '@mui/styles';

const useStyles = makeStyles(theme => ({
    logo: {
       width: '400px',
        height: '600px'
    },
    paper: {
        padding: '40px'
    }
}));

export const LoginPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);

    const [isLogin, setIsLogin] = useState(true);
    const { setAppToken } = useContext(AuthContext);
    const login = async () => {
        try {
            setLoading(true);
            const userInfo = await post('/api/login', {email, password});
            setAppToken(userInfo.token);
        } catch (e) {
            setErrorText(e.message);
        } finally {
            setLoading(false);
        }
    }
    const register = async () => {
        try {
            setLoading(true);
            if (password !== confirmedPassword) {
                setErrorText('Typed passwords are different');
                return;
            }
            const userInfo = await post('/api/register', {email, password, name});
            setAppToken(userInfo.token);
        } catch (e) {
            setErrorText(e.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = () => {
        setIsLogin(prevValue => !prevValue);
        setEmail('');
        setPassword('');
        setConfirmedPassword('');
        setName('');
        setErrorText('');
    }
    return (
        <Grid container width="100%" spacing={8} justifyContent="center">
            <Grid item xs={6} alignItems="center" justifyContent="end" container>
                <img className={classes.logo} src={logo} alt="logo"/>
            </Grid>
            <Grid item xs={6} alignItems="center" container>
                <Grid item xs={8}>
                    <Paper className={ classes.paper} sx={{backgroundColor: theme.palette.secondary.light}}>
                        <Grid container direction="column" justifyContent="center" spacing={2} minHeight={350}>
                            <Grid item container justifyContent="center">
                                <Typography variant="h5" gutterBottom>
                                    Welcome to Pazion
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorText('');
                                    }}
                                    value={email}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    error={errorText}
                                    helperText={errorText}
                                    fullWidth
                                    required
                                    label="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorText('');
                                    }}
                                    value={password}
                                />
                            </Grid>
                            {
                                !isLogin && (
                                    <Grid item>
                                        <TextField
                                            type="password"
                                            fullWidth
                                            required
                                            label="Confirm password"
                                            onChange={(e) => setConfirmedPassword(e.target.value)}
                                            value={confirmedPassword}
                                        />
                                    </Grid>

                                )
                            }
                            {
                                !isLogin && (
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Name"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                        />
                                    </Grid>

                                )
                            }
                            <Grid item container alignItems="baseline">
                                <Typography variant="subtitle1" gutterBottom>
                                    {isLogin ? 'Do not have an account?': 'Have an account?'}
                                </Typography>
                                <Button onClick={toggleForm} variant="text">{isLogin ? 'Sign Up' : 'Sign In'}</Button>
                            </Grid>
                            <Grid item container justifyContent="end">
                                <Button
                                    onClick={isLogin ? login : register}
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {isLogin ? 'Login' : 'Register'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>

            </Grid>
        </Grid>
    );
}