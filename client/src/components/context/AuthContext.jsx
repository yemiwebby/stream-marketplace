import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [bearerToken, setBearerToken] = useState(null);

    const saveAuthCredentials = ({user, bearerToken}) => {
        setUser(user);
        setBearerToken(bearerToken);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (bearerToken !== null) {
                setBearerToken(null);
                setUser(null);
            }
        }, 3500000);
        return () => clearTimeout(timer);
    }, [bearerToken]);

    return (<AuthContext.Provider value={{bearerToken, saveAuthCredentials, user}}>
        {children}
    </AuthContext.Provider>);
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }
    return context;
};

export default AuthContextProvider;
