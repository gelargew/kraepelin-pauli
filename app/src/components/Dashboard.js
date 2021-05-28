import React, { useContext, useReducer, useState } from 'react'
import { Link, useHistory, Prompt } from 'react-router-dom'
import { userContext } from './App'

const numeralSystem = {
    latin: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    hiragana: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    choices: ['latin', 'hiragana' ]
}

const selectReducer = (state, action) => {
    const limit = state.limit ?? state.options.length
    let i
    switch(action) {
        case 'moveRight':
            i = state.idx < limit - state.spaces ? state.idx + state.spaces : 0
            return 'limit' in state ? {...state, idx: i}:
            {...state, selected: state.options[i], idx: i}
        case 'moveLeft':
            console.log(action === 'moveLeft')
            i = state.idx > 0 ? state.idx - state.spaces : limit - state.spaces
            return 'limit' in state ? {...state, idx: i}:
            {...state, selected: state.options[i], idx: i}
        // case 'selected' in state:
        //     return {...state, selected: state.options[i], idx: i}
    
    
        default:
            throw new Error()
    }
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

const useKraepelin = () => {
    return
}

const useSelect = options => {
    const [selected, setSelected] = useState(options[0])
    let idx = 0
    const left = () => {
        idx--
        if (idx < 0) {
            idx = options.length - 1
            return
        }
        setSelected(options[idx])       
    }
    const right = () => {
        idx++
        if (idx >= options.length + 1) {
            idx = 0
            return
        }
        setSelected(options[idx])
    }

    const Div = () => 
    <div>
        <button onClick={left}>
            <i className="fas fa-caret-left fa-2x"></i>
        </button>
        <input disabled value={selected} />
        <button onClick={right}>
            <i className="fas fa-caret-right fa-2x"></i>
        </button>
    </div>

    return [selected, Div]
}