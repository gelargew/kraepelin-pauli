import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, Redirect, Route, useHistory } from 'react-router-dom';
import { baseUrl, userContext } from './App';
import { useTimer } from './hooks';
import { BackButton, getCsrf } from './utils'

export {AuthPage, LoginPage, RegisterPage}


const AuthPage = () => {
    const {user} =useContext(userContext)
    
    return (
        <>
            <Redirect to='/' />
            <Route path='/register'>
                <BackButton />
                <RegisterPage />
            </Route>
            <Route path='/login'>
                <BackButton />
                <LoginPage />
            </Route>
            <Route path='/activate'>
                <ActivatePage />
            </Route>
            <Route exact path="/">
                <main className='dashboard'>
                <h1 className='logo'>KPauli</h1>
                    <Link to='/register'>REGISTER</Link>
                    <Link to='/login'>LOGIN</Link>
                </main>
            </Route>           
        </>
    )
}


const LoginPage = () => {
    const {dispatchUser} = useContext(userContext)
    const history = useHistory()
    const handleSubmit = e => {
        e.preventDefault()
        dispatchUser({
            type: 'login',
            data: {
                'email': e.target.email.value,
                'password': e.target.password.value
            },
        })
    }
    
    return (    
        <form className='dashboard' onSubmit={handleSubmit}>
            <input name='email' type='email' placeholder='enter your email' required/>
            <input name='password' type='password' placeholder="enter your password" required
            pattern="[0-9a-zA-Z]{8,16}" title="Enter aa password consisting of 8-16 hexadecimal digits"/>
            <button>LOGIN</button>
        </form>           
       
    )
}


const RegisterPage = () => {
    const {dispatchUser} = useContext(userContext)
    const history = useHistory()
    const [msg, setMsg] = useState('')
    const handleRegister = async e => {
        e.preventDefault()  
        e.target.submit.disabled = true
        await dispatchUser({
            type: 'register',
            data: {
                email: e.target.email.value
            },
            perform: status => {
                if (status === 201) history.push('/activate')
                else if (status === 409) setMsg('email has been used')
                else setMsg('something went wrong')
            }
        })
        setTimeout(() => e.target.submit.disabled = false, 2000)
    }

    return (
        <form className='dashboard' onSubmit={handleRegister} >
            <input name='email' type='email' placeholder='enter your email' required/>
            <small>{msg}</small>
            <button name='submit'>Register</button>           
        </form>
    )
}

const ActivatePage = () => {
    const {user, dispatchUser} = useContext(userContext)
    const [passwordPage, setPasswordPage] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [msg, setMsg] = useState('')
    const [resendDisabled, setResendDisabled] = useState(true)
    const [timer, setTimer] = useTimer(30, () => setResendDisabled(false))

    const handleActivate = e => {
        e.preventDefault()
        dispatchUser({
            type: 'activate',
            data: {
                email: e.target.email.value,
                auth_token: e.target.token.value
            },
            perform: status => {
                if (status === 200) {
                    setPasswordPage(true)
                    setMsg('')
                }
                else if (status === 404) setMsg('incorrect token')
                else setMsg('something went wrong')
            }
        })
    }
    const handleCreate = e => {
        e.preventDefault()
        dispatchUser({
            type: 'activate',
            data: {
                email: e.target.email.value,
                password: e.target.password.value,
                auth_token: e.target.token.value
            }
        })
    }

    const resendEmail = e => {
        e.preventDefault()
        if (resendDisabled) return
        dispatchUser({
            type: 'register',
            data: {email: user.email}
        })
    }

    const confirmPassword = e => {
        setPasswordMatch(e.target.value === password)
    }

    return (    
        <form className='dashboard' onSubmit={passwordPage ? handleCreate : handleActivate}>
            <input name='email' type='email' value={user.email} disabled />
            <input name='token' disabled={passwordPage} placeholder='6-character-token'/>
            {passwordPage ?
            <>
                <input type="password" name="password" value={password} 
                onChange={e => setPassword(e.target.value)} placeholder='create your password' required
                pattern="[0-9a-zA-Z]{8,16}" title="Enter a password consisting of 8-16 hexadecimal digits"/>
                <input className={!passwordMatch ? 'password-alert' : ''} type="password" 
                placeholder='confirm password' onChange={confirmPassword} required />
            </>
            :
            <>
                <small>
                    you should receive an email with token within 30 seconds
                    <a className={resendDisabled ? 'resend-email-disabled' : 'resend-email'} 
                    onClick={resendEmail}>
                        resend token ({timer})
                    </a>
                </small>
                
            </>
            }
            <button disabled={passwordPage && !passwordMatch}>
                {passwordPage ? 'Create account' : 'Confirm token'}
            </button>
        </form>
    )
}
