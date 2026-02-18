import './Login.css';
import LoginBanner from '../../public/assets/images/illustration-authentication.svg?react'
import Logo from '../../public/assets/images/logo-large.svg?react'
// import loginBanner from '../../public/assets/images/illustration-authentication.svg'
import { useState } from 'react';

export function Login() {

    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleLogin = () => {
        setLogin(prev => !prev)
    }

    if (login) {
        console.log('login')
    }

    if (!login) {
        console.log('register')
    }

    return (
        <div className='login-page'>

            <div className="left-screen">
                <div className="auth-banner">
                    <Logo className="logo-large" style={{ color: "black" }}> </Logo>
                    {/* <LoginBanner className="login-banner"></LoginBanner> */}
                    {/* <img className='login-banner' src={loginBanner} alt="Logo" /> */}
                    <div className="text-container">
                        <h2>Keep track of your money and save for your future</h2>
                        <p>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                    </div>
                </div>
            </div>
            <div className="right-side">
                {login ?
                    <div className="auth-container">
                        <h1>Login</h1>
                        <form className="login-form">
                            <div className="input-container">
                                <p className='email-p'>Email</p>
                                <input type="email" id="email" name="email" placeholder="Enter your email" required />
                                <p className='email-p'>Password</p>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required />
                            </div>
                            <button className="login-button" type="submit">Login</button>
                        </form>
                        <div className="account-create">
                            <p>Need to create an account? <span className="sign-up" onClick={toggleLogin}>Sign Up</span></p>
                        </div>
                    </div>
                    :
                    <div className="auth-container register">
                        <h1>Register</h1>
                        <form className="login-form">
                            <div className="input-container">
                                <p className='email-p'>Email</p>
                                <input type="email" id="email" name="email" placeholder="Enter your email" required />
                                <p className='email-p'>Password</p>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required />
                                <p className='email-p'>Repeat Password</p>
                                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required />
                            </div>
                            <button className="login-button" type="submit">Register</button>
                        </form>
                        <div className="account-create">
                            <p>Already Registered? <span className="sign-up" onClick={toggleLogin}>Create an account</span></p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
