import './Login.css';
import LoginBanner from '../../public/assets/images/illustration-authentication.svg?react'
import Logo from '../../public/assets/images/logo-large.svg?react'
import loginBanner from '../../public/assets/images/illustration-authentication.svg'

export function Login() {
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
                        <p>Need to create an account? <span className="sign-up"><a href="/signup">Sign Up</a></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
