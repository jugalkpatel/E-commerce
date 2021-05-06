import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLogin] = useState(false);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthData = () => {
    return useContext(AuthContext);
}

export { AuthProvider, useAuthData };