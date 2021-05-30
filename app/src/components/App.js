import React, { createContext, useEffect, useReducer, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import { AuthPage } from './Auth'
import { Dashboard, Practice } from './Dashboard'
import { useFetch } from './hooks'
import { Kraepelin } from './Kraepelin'
import { userReducer } from './reducers'
import { Result } from './Result'
import { ToggleTheme } from './toggleTheme'

export const baseUrl = window.location.origin
export const userContext = createContext()


const App = () => {
    const [user, dispatchUser] = useFetch({}, userReducer)

    useEffect(async () => {
        dispatchUser({ type: 'fetchCurrentUser'})
        console.log(user)
    }, [])

    return (
    <userContext.Provider value={{user, dispatchUser}}>
        <ToggleTheme />
        <button onClick={() => console.log(user)}>USER</button>
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





render(<App />, document.querySelector('#root'))