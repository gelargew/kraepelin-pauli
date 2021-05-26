import React from 'react'
import { render } from 'react-dom'
import { Kraepelin } from './Kraepelin'
import { ToggleTheme } from './toggleTheme'


const App = () => {
    return (
    <>
        <ToggleTheme />
        <Kraepelin />
    </>
    )
}


render(<App />, document.querySelector('#root'))