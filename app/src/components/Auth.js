import React, { useContext, useRef, useState } from 'react';
import { Link, Redirect, Route, useHistory } from 'react-router-dom';
import { baseUrl, userContext } from './App';

export {AuthPage, LoginPage, RegisterPage, getCsrf}


const getCsrf = () => {
    const name = 'csrftoken'
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const AuthPage = () => {
    
    return (
        <main>
            <Redirect to='/auth' />
            <Route path='/auth/register'>
                register
            </Route>
            <Route path='/auth/login'>
                Login
            </Route>
            <Route exact path="/auth">
                <Link to='/auth/register'>REGISTER</Link>
                <Link to='/auth/login'>LOGIN</Link>
            </Route>           
        </main>
    )
}


const LoginPage = () => {
    
    return (
        <>
            <form>
                <input type='email' />
                <input type='password' placeholder="password" />
                <button>LOGIN</button>
            </form>
            <Link to="/auth/register">register</Link>
        </>
    )
}


const RegisterPage = () => {
    const [message, setMessage] = useState('')
    const {setUser} = useContext(userContext)
    const history = useHistory()
    const [disabled, setDisabled] = useState(false)
    const passwordInput = useRef(null)
    const [passwordConfirmed, setPasswordConfirmed] = useState(true)

    console.log(getCsrf())
    const register = async e => {
        e.preventDefault()
        setMessage('')
        setDisabled(true)
        console.log(getCsrf())
        const response = await fetch(`${baseUrl}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-CSRFToken': getCsrf()
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value
            })
        })
        
        if (response.status === 201) {
            const data = await response.json()
            setUser(data)
            history.push('/')
        }
        else if (response.status === 403) {
        setMessage('something went wrong, if you are in private mode please enable cookies for csrf token')
        }
        setDisabled(false)
    }

    const confirmPassword = e => {
        setPasswordConfirmed(e.target.value === passwordInput.current.value)
    }

    return (
        <div className='auth-page'>
            <h3>Register</h3>
            <form onSubmit={register}>
                <label>
                    Username:
                    <input type='text' name='username' placeholder='username...' disabled={disabled} 
                    title='Enter an username consisting of 6-16 hexadecimal digits' pattern="[0-9a-zA-Z]{6,16}" required />
                </label>

                <label>
                    email:
                    <input type='email' name='email' placeholder='email...' disabled={disabled} 
                    title='Enter your email' required/>
                </label>

                <label>
                    Password:
                    <input ref={passwordInput} type='password' name='password'
                    pattern="[0-9a-zA-Z]{8,16}" title="Enter an ID consisting of 8-16 hexadecimal digits"
                    placeholder='password...' disabled={disabled} required/>
                </label>

                <label>
                    Confirm password:
                    <input onInput={confirmPassword} type='password' name='confirmpassword' 
                    placeholder='confirm password...' disabled={disabled} title='Confirm your password' required
                    className={passwordConfirmed ? '' : 'alert'} />
                </label>

                <button type='submit' disabled={!passwordConfirmed}>Register</button>
            </form>
            <small>{message}</small>
        </div>
    )
}


const handleAuth = async (e, type='login', body) => {
    e.preventDefault()
    const response = await fetch(`${baseUrl}/auth/${type}/`, {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-CSRFToken': getCsrf()
        },
        body: body
    })
    return response

}