import React, { createContext, useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
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
                <Route path='/'>
                    <div>
                        <Link to="/kraepelin"> krapelin</Link>
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    </userContext.Provider>
    )
}


render(<App />, document.querySelector('#root'))