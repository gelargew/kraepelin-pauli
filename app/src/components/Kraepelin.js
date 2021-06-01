import React, { useEffect, useState, useRef, useContext } from 'react'
import {Link, Prompt, useLocation} from 'react-router-dom'
import { baseUrl, userContext } from './App'
import { getCsrf } from './utils'

// record position for every minute to create chart !!!!! also make radar chart
export const Kraepelin = () => {
    const {length, numberFormat, columnCount, time} = useLocation().state
    const [numbers , setNumbers] = useState(randomArray({length: length + 1}))
    const [answers, setAnswers] = useState(new Array(length).fill(''))
    const [result, setResult] = useState(new Array(length).fill(0))
    const [position, setPosition] = useState(0)
    const [curNumbers, setCurNumbers] = useState(numbers.slice(0, columnCount))
    const [inputDisabled, setInputDisabled] = useState(true)
    const [timer, timesUp] = useTimer(time)
    const {user} = useContext(userContext)
    const container = useRef(null)
    const kraepelinInputs = useRef(null)
    const submitButton = useRef(null)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        handleSubmit()
    }, [timesUp])

    useEffect( () => {
        container.current.style.transform = `translateY(-${position % (curNumbers.length - 1)}00px)`
        if (position >= length) {
            setPosition(0)
            setCurNumbers(numbers.slice(0, columnCount))
        }
        else if (position > 0 && position % (curNumbers.length - 1) == 0) {
            setCurNumbers(numbers.slice(position, position + columnCount))
        }
        setTimeout(() => setInputDisabled(false), 0)
    },[position])

    const handleInput = async e => {
        setInputDisabled(true)
        const val = e ? parseInt(e.target.value) : '0'
        if (handleDown()) {
            setAnswers(prev => {
                prev[position] = val
                console.log(answers[position])
                return prev
            })
            setResult(prev => {
                const correct = (numbers[position] + numbers[position + 1]) % 10 === val
                prev[position] = correct ? 1 : -1
                return prev
            })
        }
    }

    const handleKeyup = e => {
        const val = parseInt(e.code.slice(-1))       

        if (val === 0) {
            clickInput(10)
        }
        else if (0 < val && val < 10) {
            clickInput(val-1)
        }
        else {
            if (e.code === 'ArrowUp') clickInput(9)
            else if (e.code === 'ArrowDown') clickInput(11)
        }
    }

    const clickInput = idx => kraepelinInputs.current.children[idx].click()
    const handleUp = () => {
        if (position < 1) return;
        setPosition(prev => prev - 1)
    }
    const handleDown = () => {
        console.log('down')
        if (position >= length) {
            return false
        }
        setPosition(prev => prev + 1)
        return true
    }

    const handleSubmit = async () => {
        const context = {
            user: user.id,
            timeleft: 20,
            numeral_system: numberFormat,
            results: result.toString(),
            answers: answers.toString(),
            numbers: numbers.toString()
        }
        const response = await fetch(`${baseUrl}/api/kraepelin/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrf()
            },
            body: JSON.stringify(context)
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
    }


    return (
        <div className='kraepelin' >

            <div className='container' >
                <div className={inputDisabled ? 'answer-line flash' : 'answer-line'}></div>
                <div className='kraepelin-numbers' ref={container}>
                    {curNumbers.map((l, i) =>                  
                    <li key={i}>
                        {numberFormat[l]}
                        <p>{numberFormat[answers[parseInt(position/curNumbers.length)*(curNumbers.length - 1) + i]]}</p>
                    </li>
                    )}
                </div>
            </div>

            <div className='kraepelin-inputs' ref={kraepelinInputs}>
                {[1,2,3,4,5,6,7,8,9].map(num => 
                <button key={num} onClick={handleInput} 
                className='kraepelin-input' value={num} disabled={inputDisabled}>
                    {numberFormat[num]}
                </button>)}
                <button className='kraepelin-input' onClick={handleUp} disabled={inputDisabled}>
                    <i className="fas fa-chevron-up fa-2x"></i>
                </button>
                <button className='kraepelin-input' onClick={handleInput} value="0" disabled={inputDisabled}>
                    {numberFormat[0]}
                </button>
                <button className='kraepelin-input' onClick={handleDown} disabled={inputDisabled} title="down">
                    <i className="fas fa-chevron-down fa-2x"></i>
                </button>
            </div>

            <Prompt message={(location, action) => 
            location.pathname.startsWith("/result") ? "Are you sure?" : "Are you sure you want to leave?"} />

            <Link ref={submitButton} className='submitKraepelin' to={{
                    pathname: "/result",
                    state: { result: result }
                }} replace>
                    <p>{timer}</p>
                    SUBMIT
            </Link>

            <div className="timer">{timer}</div>
        </div>
    )
}

const useTimer = (initialState) => {
    const [counter, setCounter] = useState(initialState)
    const [timesUp, setTimesUp] = useState(false)
    useEffect(() => {
        counter > 0 ? setTimeout(() => setCounter(counter - 1), 1000) : setTimesUp(true)
    }, [counter])

    return [counter, timesUp]
}

const getRandomInt = (max=10) => Math.floor(Math.random() * max)
const randomArray = ({max=10, length=50}) => [... new Array(length)].map(() => getRandomInt(max))