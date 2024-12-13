import React, { useContext, useState } from 'react'
import AuthContext from '../service/AuthContext'

const LoginPage = () => {

    const { login } = useContext(AuthContext)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    return (
        <div className='loginpage'>
            <div className="container login-container">
                <div className="login-form">
                    <div className="cart-field mt-3">
                        <label htmlFor="">Логин</label>
                        <input type="text" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="cart-field">
                        <label htmlFor="">Пароль</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="text-center mt-4">
                        <button className="prime-btn"
                            onClick={e => login(username, password)}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage