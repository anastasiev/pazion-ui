import {createContext, useState} from "react";
import {TOKEN_NAME} from "./constants";
import {LoginPage} from "./pages/LoginPage";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_NAME))

    const setAppToken = (newToken) => {
        localStorage.setItem(TOKEN_NAME, newToken);
        setToken(newToken)
    }

    return (
        <AuthContext.Provider value={{token, setAppToken}}>
            {token ? children : <LoginPage />}
        </AuthContext.Provider>
    )
}