import React, { createContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link, Switch, Route, useHistory } from 'react-router-dom'
import { AuthPage } from './Auth'
import { Dashboard, InitPage, SettingPage } from './Dashboard'
import { useFetchReducer } from './hooks'
import { Kraepelin } from './Kraepelin'
import { userReducer } from './reducers'
import { Result } from './Result'
import { ToggleTheme } from './toggleTheme'

export const baseUrl = window.location.origin
export const userContext = createContext()


const App = () => {
    const [user, dispatchUser] = useFetchReducer({}, userReducer)
    const [darkTheme, setDarkTheme] = useState(true)
    const history = useHistory()

    useEffect(async () => {
        dispatchUser({ type: 'fetchCurrentUser'})
        console.log(user)
    }, [])

    return (
    <userContext.Provider value={{user, dispatchUser, setDarkTheme}}>
        <button onClick={() => window.history.back()}>BACK</button>
        <ToggleTheme darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <BrowserRouter>
        {user.is_authenticated ?       
            <Switch>
                <Route path='/kraepelin'>
                    <Kraepelin />
                </Route>
                <Route path='/account'>
                    <SettingPage />
                </Route>
                <Route path="/initiate">
                    <h1>initiate</h1>
                </Route>
                <Route path="/practice">
                    <InitPage />
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