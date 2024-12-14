import { createContext, useState, useEffect } from "react";
import { URL } from "./config";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { ServiceFunctions } from "./serviceFunctions";

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





    const [data, setData] = useState([])

    const [categories, setCategories] = useState([])
    const [active, setActive] = useState()
    useEffect(() => {
        ServiceFunctions.getCategories().then(data => {
            setCategories(data)
        })
    }, [])

    useEffect(() => {
        setActive(categories[0])
    }, [categories.length])


    useEffect(() => {
        if (active) {
            ServiceFunctions.getProductsByCategory(active?.id).then(data => setData(data))
        }
    }, [active])

    const [pageAmount, setPageAmount] = useState(1)
    const [pageNum, setPageNum] = useState(1)
    useEffect(() => {
        let num = data ? Math.ceil(data.length / 18) : 1
        setPageAmount(num)
    }, [data])

    const [chunk, setChunck] = useState([])
    useEffect(() => {
        if (pageNum === 1 && data.length) {
            const arr = data ? data.slice(0, pageNum * 18) : []
            setChunck(arr)
        }
        else {
            const arr = data && data.length ? data.slice((pageNum - 1) * 18, pageNum * 18) : []
            setChunck(arr)

        }
    }, [data, pageNum])

    const [detailed, setDetailed] = useState(null)








    const contextData = {
        login: login,
        logout: logout,
        user: user,
        authToken: authToken,
        data: data,
        categories: categories,
        setCategories: setCategories,
        setData: setData,
        detailed: detailed,
        setDetailed: setDetailed,
        pageAmount: pageAmount,
        setPageAmount: setPageAmount,
        pageNum: pageNum,
        setPageNum: setPageNum,
        chunk: chunk,
        setChunck: setChunck,
        active: active,
        setActive: setActive
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