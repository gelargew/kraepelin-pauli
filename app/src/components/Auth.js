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
                <RegisterPage />
            </Route>
            <Route path='/auth/login'>
                <LoginPage />
            </Route>
            <Route path='/auth/activate'>
                <ActivatePage />
            </Route>
            <Route exact path="/auth">
                <Link to='/auth/register'>REGISTER</Link>
                <Link to='/auth/login'>LOGIN</Link>
            </Route>           
        </main>
    )
}


const LoginPage = () => {
    const {dispatchUser} = useContext(userContext)
    const handleSubmit = e => {
        e.preventDefault()
        dispatchUser({
            type: 'login',
            data: {
                'email': e.target.email.value,
                'password': e.target.password.value
            }
        })
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name='email' type='email' />
                <input name='password' type='password' placeholder="password" />
                <button>LOGIN</button>
            </form>
            <Link to="/auth/register">register</Link>
        </>
    )
}


const RegisterPage = () => {
    const {user, dispatchUser, responseStatus} = useContext(userContext)
    const history = useHistory()
    const handleRegister = e => {
        e.preventDefault()  
        dispatchUser({
            type: 'register',
            data: {
                email: e.target.email.value
            },
            perform: () => history.push('/auth/activate/')
        })
    }

    return (
        <form onSubmit={handleRegister}>
            <input name='email' type='email' />
            <button>Register</button>
        </form>
    )
}

const ActivatePage = () => {
    const {user, dispatchUser} = useContext(userContext)

    const handleActivate = e => {
        e.preventDefault()
        dispatchUser({
            type: 'activate',
            data: {
                email: user.email,
                auth_token: e.target.token.value
            }
        })
    }

    return (
        <form onSubmit={handleActivate}>
            <input name='email' type='email' value={user.email} disabled readOnly />
            <input name='token' />
            <button>Activate account</button>
        </form>
    )
}
