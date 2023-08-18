import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import {AuthProvider} from "./AuthProvider";
import {QuestionsPage} from "./pages/QuestionsPage";

const theme = createTheme({
    palette: {
        primary: {
            main: '#EBC42B'
        },
        secondary: {
            main: '#f0d58c',
            light: 'rgba(240, 213, 140, 0.1)'
        }
    }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <QuestionsPage />
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
