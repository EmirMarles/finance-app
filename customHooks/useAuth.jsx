import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: userData.email,
                password: userData.password
            })
            const { token, user } = response.data
            localStorage.setItem("token", token)
            setUser(user)
        } catch (err) {
            if (err.response){
                throw new Error(err.response.data.message);
            } else if (err.request){
                throw new Error("Server not responding")
            } else {
                throw new Error("Something went wrong")
            }
        }
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext)
}
