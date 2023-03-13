import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [bearerToken, setBearerToken] = useState(null);
  const [user, setUser] = useState(null);
  const [streamToken, setStreamToken] = useState(null);

  const saveAuthCredentials = ({ bearerToken, user, streamToken }) => {
    setBearerToken(bearerToken);
    setUser(user);
    setStreamToken(streamToken);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bearerToken !== null) {
        setBearerToken(null);
        setUser(null);
        setStreamToken(null);
      }
    }, 3500000);
    return () => clearTimeout(timer);
  }, [bearerToken]);

  return (
    <AuthContext.Provider value={{ bearerToken, saveAuthCredentials, user, streamToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
