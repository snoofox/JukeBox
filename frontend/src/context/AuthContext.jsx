import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const authCookie = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    const [authTokens, setAuthTokens] = useState(() => authCookie ? authCookie : null);
    const [user, setUser] = useState(() => authCookie ? jwt_decode(authCookie.access) : null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('auth')
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    const context = {
        user: user,
        logout: logout,
        setUser: setUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens
    }

    return (
        <AuthContext.Provider value={context} >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
