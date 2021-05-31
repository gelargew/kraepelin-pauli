import React, { useContext, useReducer, useState } from 'react'
import { Link, useHistory, Prompt } from 'react-router-dom'
import { userContext } from './App'
import { selectReducer } from './reducers'

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
        numberFormat: "latin",
        columnCount: 100
    })
    const [kLength, dispatchKLength] = useReducer(selectReducer, {limit: 8000, spaces: 100, idx: 5000})
    const [kTime, dispatchKTime] = useReducer(selectReducer, {limit: 240, spaces: 10, idx: 0})
    const [nm, dispatch] = useReducer(selectReducer, {
        selected: 'latin',
        options: ['latin', 'hiragana'],
        spaces: 1,
        idx: 0
    })
    


    return (
        <main className="dashboard">
            <small>length</small>
            {/* <div className="setup-inputs">
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="number" value={kraepelin.length} disabled={!user.premium} 
                onChange={e => setKraepelin({...kraepelin, length: e.target.value})} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div> */}

            <div className="setup-inputs">
                <button onMouseDown={() => dispatchKLength('moveLeft')}><i className="fas fa-caret-left fa-2x"></i></button>
                <input readOnly value={kLength.idx} />
                <button onClick={() => dispatchKLength('moveRight')}><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            {/* <div className="setup-inputs">
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="number" value={kraepelin.time} disabled={!user.premium} 
                onChange={e => setKraepelin({...kraepelin, time: e.target.value})} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div> */}

            <div className="setup-inputs">
                <button onMouseDown={() => dispatchKTime('moveLeft')}><i className="fas fa-caret-left fa-2x"></i></button>
                <input readOnly value={kTime.idx} />
                <button onClick={() => dispatchKTime('moveRight')}><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <div className="setup-inputs">
                <button><i className="fas fa-caret-left fa-2x"></i></button>
                <input type="text" disabled value={kraepelin.operation} />
                <button><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            {/* <div className="setup-inputs">
                <button onClick={() => 
                    setNumberalChoice(prev => prev ? prev - 1 : numeralSystem.choices.length - 1)}>
                    <i className="fas fa-caret-left fa-2x"></i>
                </button>
                <input onChange={e => setKraepelin({...kraepelin, numberFormat: numeralSystem[e.target.value]})} type="text" disabled 
                value={numeralSystem.choices[numeralChoice]}/>
                <button onClick={() => 
                    setNumberalChoice(prev => prev + 1 < numeralSystem.choices.length ? prev + 1 : 0 )}>
                    <i className="fas fa-caret-right fa-2x"></i>
                </button>
            </div> */}

            <div className="setup-inputs">
                <button onClick={() => dispatch('moveLeft')}><i className="fas fa-caret-left fa-2x"></i></button>
                <input readOnly value={nm.selected} />
                <button onClick={() => dispatch('moveRight')}><i className="fas fa-caret-right fa-2x"></i></button>
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

const SettingPage = () => {
    const {user, dispatchUser} = useContext(userContext)
    const [[first_name, last_name], setName] = useState([user.first_name, user.last_name])

    const changeFirstName = e => setName([e.target.value, last_name])
    const changeLastName = e => setName([first_name, e.target.value])

    const handleSubmit = e => {
        e.preventDefault()
        dispatchUser({
            type: 'update',
            data: {
                first_name: first_name,
                last_name: last_name,
                password: e.target.password.value
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='email' value={user.email} disabled/>
            <input name='firstname' value={user.firt_name} onChange={changeFirstName} />
            <input name='lastname' value={user.last_name} onChange={changeLastName} />
            <input type='password' name='password' onBlur={() => 'd'} />
            <button>Save</button>
        </form>
    )
}