import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useHistory, Prompt, Redirect } from 'react-router-dom'
import { userContext } from './App'
import { selectReducer } from './reducers'

export { Dashboard, InitPage, SettingPage }

const numeralSystem = {
    latin: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    hiragana: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    choices: ['latin', 'hiragana' ]
}

const Dashboard = () => {

    return (    
        <main className="dashboard">
            <h1 className='logo'>KPauli</h1>
            <Redirect to='/'/>
            <Link to="/start">START</Link>
            <button to="/group" title="create a group test, display group results" disabled>GROUP</button>
            <button to="/history" title="your kraepelin results" disabled>HISTORY</button>
            <Link to='/account'>ACCOUNT</Link>
            <a disabled>contact us</a>
        </main>
    )
}

const InitPage = () => {
    const [kLength, dispatchKLength] = useReducer(selectReducer, {limit: 8000, spaces: 100, idx: 100})
    const [kTime, dispatchKTime] = useReducer(selectReducer, {limit: 120, spaces: 5, idx: 60})
    const [nm, dispatch] = useReducer(selectReducer, {
        selected: 'latin',
        options: ['latin', 'hiragana'],
        spaces: 1,
        idx: 0
    })
    return (
        <main className="dashboard">

            <small>length</small>
            <div className="setup-inputs">
                <button onMouseDown={() => dispatchKLength('moveLeft')}><i className="fas fa-caret-left fa-2x"></i></button>
                <input type='number' onChange={e => dispatchKLength(e.target.value)} 
                value={kLength.idx} min='0' max={kLength.limit} />
                <button onClick={() => dispatchKLength('moveRight')}><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <small>time limit</small>
            <div className="setup-inputs">
                <button onMouseDown={() => dispatchKTime('moveLeft')}><i className="fas fa-caret-left fa-2x"></i></button>
                <input type='number' onChange={e => dispatchKTime(e.target.value)} value={kTime.idx}
                min='0' max={kTime.limit} />
                <button onClick={() => dispatchKTime('moveRight')}><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <div className="setup-inputs">
                <button disabled><i className="fas fa-caret-left fa-2x"></i></button>
                <input disabled type="text" value='addition'/>
                <button disabled><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <div className="setup-inputs">
                <button onClick={() => dispatch('moveLeft')}><i className="fas fa-caret-left fa-2x"></i></button>
                <input readOnly value={nm.selected} />
                <button onClick={() => dispatch('moveRight')}><i className="fas fa-caret-right fa-2x"></i></button>
            </div>

            <Link to={{
                pathname: "/kraepelin",
                state:  {
                    length: kLength.idx,
                    time: kTime.idx*60,
                    numberFormat: numeralSystem[nm.selected],
                    numberFormatString: nm.selected,
                    columnCount: kLength.idx > 900 ? 100 : 10 * parseInt(kLength.idx / 100)
                }
            }} title="start" replace>
                START
            </Link>
        </main>
    )
}

const SettingPage = () => {
    const {user, dispatchUser, setDarkTheme, darkTheme} = useContext(userContext)
    const [[first_name, last_name], setName] = useState(['', ''])
    useEffect(() => setName([user.first_name, user.last_name]), [user])
    const changeFirstName = e => setName([e.target.value, last_name])
    const changeLastName = e => setName([first_name, e.target.value])
    const [preventSubmit, setPreventSubmit] = useState(true)

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
 
        <form className="dashboard" onSubmit={handleSubmit}>
            <input name='email' value={user.email} disabled/>
            <button type='button' onClick={() => setDarkTheme(dark => !dark)}>{darkTheme ? 'DARK' : 'LIGHT'} MODE</button>           
            <small>first name:</small>
            <input name='firstname' value={first_name} 
            onChange={changeFirstName} placeholder='first name' title='first name'/>
            <small>last name:</small>
            <input name='lastname' value={last_name} 
            onChange={changeLastName} placeholder='last name' title='last name' />
            <small>enter password to save changes.</small>
            <input type='password' name='password' onFocus={() => setPreventSubmit(false)} required/>
            <button title='save your settings' disabled={preventSubmit}>SAVE</button>
            <button type='button' onClick={() => dispatchUser({type: 'logout'})}>LOGOUT</button>
        </form>
    
)
}