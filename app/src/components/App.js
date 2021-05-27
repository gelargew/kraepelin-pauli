import React, { createContext, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import { Dashboard, Practice } from './Dashboard'
import { Kraepelin } from './Kraepelin'
import { ToggleTheme } from './toggleTheme'

export const baseUrl = window.location.origin
export const userContext = createContext()

const App = () => {
    const [user, setUser] = useState({})

    return (
    <userContext.Provider value={{user, setUser}}>
        <ToggleTheme />
        <BrowserRouter>
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
                <Route path='/'>
                    <Dashboard />
                </Route>
            </Switch>
        </BrowserRouter>
    </userContext.Provider>
    )
}


render(<App />, document.querySelector('#root'))