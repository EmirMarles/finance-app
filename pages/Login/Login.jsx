import './Login.css';
import Logo from '../../public/assets/images/logo-large.svg?react'
import { useState, useEffect } from 'react';
import { useAuth } from '../../customHooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useWindowWidth } from '../../customHooks/useWindowWidth';
import { TABLET_WIDTH } from '../../consts/windowWidth';

export function Login() {

    const [loginContainer, setLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [err, setErr] = useState({
        showErr: false,
        errMessage: null
    })
    const [loading, setLoading] = useState(false)

    const { login, register } = useAuth();
    const width = useWindowWidth();

    const toggleLogin = () => {
        setLogin(prev => !prev)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (err.showErr === false) return

        const errTimeout = setTimeout(() => {
            setErr(prev => (
                {
                    ...prev,
                    showErr: false
                }
            ))
        }, 1500)

        return () => clearTimeout(errTimeout)
    }, [err])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        const resulst = await login({ email, password });
        if (resulst.success) {
            setLoading(false)
            navigate('/')
        }
        else {
            setErr({
                showErr: true,
                errMessage: resulst.message
            })
            setLoading(false)
        }
    }

    const handleRegister = async (e) => {
        // what does it do? event preventDefault()
        e.preventDefault();
        setLoading(true)
        const result = await register({ email, password })
        if (result.success) {
            navigate('/login')
            setErr({
                showErr: true,
                errMessage: 'Registration successful!'
            })
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        } else {
            setErr(
                {
                    showErr: true,
                    errMessage: result.message
                }
            )
            setLoading(false)
        }
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className='login-page'>
            {width > TABLET_WIDTH &&
                <div className="left-screen">
                    <div className="auth-banner">
                        <Logo className="logo-large" style={{ color: "black" }}> </Logo>
                        <div className="text-container">
                            <h2 className='messsage-login'>Keep track of your money and save for your future</h2>
                            <p>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                        </div>
                    </div>
                </div>
            }
            <div className="right-side">
                {loginContainer ?
                    <div className="auth-container">
                        <h1>Login</h1>
                        <form className="login-form">
                            <div className="input-container">
                                <p className='email-p'>Email</p>
                                <input type="email" id="email" name="email" placeholder="Enter your email" required value={email} onChange={handleEmailInput} />
                                <p className='email-p'>Password</p>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required hidden={false} value={password} onChange={handlePasswordInput} />
                            </div>
                            <button className="login-button" type="submit" onClick={handleLogin}>
                                {loading ? <p>Loading...</p> : <p>Login</p>}
                            </button>
                        </form>
                        <div className="account-create">
                            <p>Need to create an account? <span className="sign-up" onClick={toggleLogin}>Sign Up</span></p>
                        </div>

                        {err.showErr &&
                            <div className="error-message">
                                <p>{err.errMessage}!</p>
                            </div>
                        }
                    </div>
                    :
                    <div className="auth-container register">
                        <h1>Register</h1>
                        <form className="login-form">
                            <div className="input-container">
                                <p className='email-p'>Email</p>
                                <input type="email" id="email" name="email" placeholder="Enter your email" required value={email} onChange={handleEmailInput} />
                                <p className='email-p'>Password</p>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required value={password} onChange={handlePasswordInput} />
                                <p className='email-p'>Repeat Password</p>
                                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button className="login-button" type="submit" onClick={handleRegister}>
                                {loading ? <p>Loading...</p> : <p>Register</p>}
                            </button>
                        </form>
                        <div className="account-create">
                            <p>Already Registered? <span className="sign-up" onClick={toggleLogin}>Sign in</span></p>
                        </div>
                        {err.showErr &&
                            <div className="error-message">
                                <p>{err.errMessage}!</p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
