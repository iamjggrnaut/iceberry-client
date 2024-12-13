import { createContext, useState, useEffect } from "react";
import { URL } from "./config";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState()
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    const login = async (username, password) => {
        if (!password || !username) {
            alert('Введите корректное значение для всех полей')
        }
        const response = await fetch(URL + '/admin/login', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        const data = await response.json()
        if (response.status !== 200) {
            alert('Ошибка')
        }
        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data?.token))
            localStorage.setItem('authToken', data?.token)
            navigate('/admin')
        }
    }

    const target = localStorage.getItem('authToken')
    useEffect(() => {
        if (target) {
            setAuthToken(target)
            setUser(jwtDecode(target))
        }
    }, [target])



    const logout = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('dashboard')
    }

    const contextData = {
        login: login,
        logout: logout,
        user: user,
        authToken: authToken,
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (user && user.exp * 1000 < Date.now()) {
                logout()
            }
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}