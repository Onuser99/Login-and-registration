import { createContext, useContext } from "react";

export const AuthContex = createContext();


export const AuthProvider = ({ children }) => {
    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem("Token", serverToken);
    }
return <AuthContex.Provider value={storeTokenInLS}>
    {children}
</AuthContex.Provider>
}

export const userAuth = () => {
    const authContexValue = useContext(AuthContex);
    if (!authContexValue) {
        throw new Error("useAuth used outside of the provider");
    }

    return authContexValue;
}