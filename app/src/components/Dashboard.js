import React, { useContext, useState } from 'react'
import { Link, useHistory, Prompt } from 'react-router-dom'
import { userContext } from './App'

const numeralSystem = {
    latin: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    hiragana: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    choices: ['latin', 'hiragana' ]
}



export const Dashboard = () => {

    return (    
        <main className="dashboard">
            <Link to="/initiate">一</Link>
            <Link to="/practice">PRACTICE</Link>
            <Link to="/group" title="create a group test, display group results">GROUP</Link>
            <Link to="/history" title="your kraepelin results">HISTORY</Link>
            <Link to="/contactus">contact us</Link>
        </main>
    )
}

export const Practice = () => {
    const {user, setUser} = useContext(userContext)
    const [kraepelin, setKraepelin] = useState({
        length: 5000,
        time: 120,
        operation: "addition",
        numberFormat: numeralSystem[numeralSystem.choices[numeralChoice]],
        columnCount: 100
    })
    const [numeralChoice, setNumberalChoice] = useState(0)


    
    


    return (
        <main className="dashboard">
            <small>length</small>
            <div className="setup-inputs">
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="number" value={kraepelin.length} disabled={!user.premium} 
                onChange={e => setKraepelin({...kraepelin, length: e.target.value})} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <div className="setup-inputs">
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="number" value={kraepelin.time} disabled={!user.premium} 
                onChange={e => setKraepelin({...kraepelin, time: e.target.value})} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <div className="setup-inputs">
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="text" disabled value={kraepelin.operation} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <div className="setup-inputs">
                <button onClick={() => 
                    setNumberalChoice(prev => prev ? prev - 1 : numeralSystem.choices.length - 1)}>
                    <i className="fas fa-caret-left fa-2x"></i>
                </button>
                <input type="text" disabled value={numeralSystem.choices[numeralChoice]}/>
                <button onClick={() => 
                    setNumberalChoice(prev => prev + 1 < numeralSystem.choices.length ? prev + 1 : 0 )}>
                    <i className="fas fa-caret-right fa-2x"></i>
                </button>
            </div>

            <Link to={{
                pathname: "/kraepelin",
                state:  kraepelin
            }} title="start practice">
                START
            </Link>
            <Prompt message={(location, action) => 
                console.log(action)
            } />
        </main>
    )
}