import React, { useContext, useEffect, useRef, useState } from 'react';
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
    const {user} =useContext(userContext)
    
    return (
        <main className="dashboard">
            <Redirect to='/' />
            <Route path='/register'>
                <RegisterPage />
            </Route>
            <Route path='/login'>
                <LoginPage />
            </Route>
            <Route path='/activate'>
                <ActivatePage />
            </Route>
            <Route exact path="/">
                <Link to='/register'>REGISTER</Link>
                <Link to='/login'>LOGIN</Link>
            </Route>           
        </main>
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
        <>
            <form onSubmit={handleSubmit}>
                <input name='email' type='email' />
                <input name='password' type='password' placeholder="password" />
                <button>LOGIN</button>
            </form>
            <Link to="/register">register</Link>
        </>
    )
}


const RegisterPage = () => {
    const {dispatchUser} = useContext(userContext)
    const history = useHistory()
    const handleRegister = e => {
        e.preventDefault()  
        dispatchUser({
            type: 'register',
            data: {
                email: e.target.email.value
            },
            perform: () => history.push('/activate')
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
    const [passwordPage, setPasswordPage] = useState(false)

    const handleActivate = e => {
        console.log(passwordPage)
        e.preventDefault()
        dispatchUser({
            type: 'activate',
            data: {
                email: e.target.email.value,
                auth_token: e.target.token.value
            },
            perform: status => status === 200 && setPasswordPage(true)
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

    return (    
        <form onSubmit={passwordPage ? handleCreate : handleActivate}>
            <input name='email' type='email' value={user.email} disabled readOnly />
            <input name='token' disabled={passwordPage}/>
            {passwordPage && 
            <>
                <input type="password" name="password" />
                <input type="password" />
            </>}
            <button>{passwordPage ? 'Create account' : 'Confirm token'}</button>
        </form>
    )
}
