import React, { useContext, useState } from 'react'
import { Link, useHistory, Prompt } from 'react-router-dom'
import { userContext } from './App'


export const Dashboard = () => {

    return (    
        <main className="dashboard">
            <Link to="/initiate">START</Link>
            <Link to="/practice">PRACTICE</Link>
            <Link to="/group" title="create a group test, display group results">GROUP</Link>
            <Link to="/history" title="your kraepelin results">HISTORY</Link>
            <Link to="/contactus">contact us</Link>
        </main>
    )
}

export const Practice = () => {
    const {user, setUser} = useContext(userContext)
    const [time, setTime] = useState(120)
    const [length, setLength] = useState(5000)
    const history = useHistory()


    return (
        <main className="dashboard">
            <div>
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="number" value={length} onChange={e => setLength(e.target.value)} disabled={!user.premium} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div>         
            <input type="number" value={time} onChange={e => setTime(e.target.value)} disabled={!user.premium} />
            <Link to={{
                pathname: "/kraepelin",
                state:  {kraepelinLength: length, kraepelinTime: time}
            }} title="start practice">
                START
            </Link>
            <Prompt message={(location, action) => 
                console.log(action)
            } />
        </main>
    )
}