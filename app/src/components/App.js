import React, { createContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import { AuthPage } from './Auth'
import { Dashboard, Practice } from './Dashboard'
import { Kraepelin } from './Kraepelin'
import { Result } from './Result'
import { ToggleTheme } from './toggleTheme'
import { getCsrf } from './utils'

export const baseUrl = window.location.origin
export const userContext = createContext()

const registerDummy = async () => {
    const response = await fetch(`${baseUrl}/auth/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrf()
        },
        body: JSON.stringify({
            email: 'user7@mail.com'
        })
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
}

const activateDummy = async () => {
    const response = await fetch(`${baseUrl}/auth/activate/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrf()
        },
        body: JSON.stringify({
            email: 'user7@mail.com',
            auth_token: 'MXVS43'
        })
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
}

const App = () => {
    const [user, setUser] = useState({})

    useEffect(async () => {
        const response = await fetch(baseUrl + '/auth/current_user/')
        const data = await response.json()
        setUser(data)
        activateDummy()
    }, [])

    return (
    <userContext.Provider value={{user, setUser}}>
        <ToggleTheme />
        <BrowserRouter>
        {user.is_authenticated ?       
            <Switch>
                <Route path='/kraepelin'>
                    <Kraepelin />
                </Route>
                <Route path="/initiate">
                    <h1>initiate</h1>
                </Route>
                <Route path="/practice">
                    <Practice />
                </Route>
                <Route path="/group">
                    <h1>Group</h1>
                </Route>
                <Route path="/contactus">
                    <h1>contactus</h1>
                </Route>
                <Route path="/result">
                    <Result />
                </Route>
                <Route path='/'>
                    <Dashboard />
                </Route>
            </Switch>
            :
            <AuthPage />
        }
        </BrowserRouter>
    </userContext.Provider>
    )
}

const userReducer = (state, action) => {
    pass
}


render(<App />, document.querySelector('#root'))