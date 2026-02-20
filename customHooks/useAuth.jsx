import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user")
        const userData = user ? JSON.parse(user) : null
        return userData
    })

    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: userData.email,
                password: userData.password
            })
            const { token, user } = response.data
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", JSON.stringify(token))
            setUser(user)
            return ({ success: true })
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Login Failed"
            }
        }
    }

    const register = async (userData) => {
        try {
            // first comparison of both passwords
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                email: userData.email,
                password: userData.password
            })
            return ({ success: true, message: response.data.message })
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Registration Failed"
            }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
