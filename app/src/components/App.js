import React, { createContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link, Switch, Route, useHistory, Redirect, useLocation } from 'react-router-dom'
import { AuthPage } from './Auth'
import { Dashboard, InitPage, SettingPage } from './Dashboard'
import { useFetchReducer } from './hooks'
import { Kraepelin } from './Kraepelin'
import { userReducer } from './reducers'
import { Result } from './Result'
import { ToggleTheme } from './toggleTheme'
import { BackButton } from './utils'

export const baseUrl = window.location.origin
export const userContext = createContext()


const App = () => {
    const [user, dispatchUser] = useFetchReducer({}, userReducer)
    const [darkTheme, setDarkTheme] = useState(true)

    useEffect(async () => {
        dispatchUser({ type: 'fetchCurrentUser'})
    }, [])

    return (
    <userContext.Provider value={{user, dispatchUser, setDarkTheme, darkTheme}}>       
        <ToggleTheme darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <BrowserRouter>
        {user.is_authenticated ?       
            <Switch>
                <Route path='/kraepelin'>
                    <Kraepelin />
                </Route>
                <Route path='/account'>
                    <BackButton />
                    <SettingPage />
                </Route>
                <Route path="/start">
                    <BackButton />
                    <InitPage />
                </Route>
                <Route path="/group">
                    <BackButton />
                    <h1>Group</h1>
                </Route>
                <Route path="/contactus">
                    <BackButton />
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
            <>
                <BackButton />
                <AuthPage />
            </>
        }
        </BrowserRouter>
    </userContext.Provider>
    )
}





render(<App />, document.querySelector('#root'))