import React from 'react'
import { render } from 'react-dom'
import { Kraepelin } from './Kraepelin'


const App = () => {
    return (
    <>
        <Kraepelin />
    </>
    )
}


render(<App />, document.querySelector('#root'))