import React, { useEffect, useState, useRef, useContext } from 'react'
import {Link, Prompt, useLocation} from 'react-router-dom'
import { baseUrl, userContext } from './App'
import { getCsrf, randomArray } from './utils'
import { useTimer, useSliceData } from './hooks'

// record position for every minute to create chart !!!!! also make radar chart
export const Kraepelin = () => {
    const {
        length, 
        numberFormat, 
        numberFormatString, 
        columnCount, 
        time} = useLocation().state
    const [numbers , setNumbers] = useState(randomArray({length: length + 1}))
    const [answers, setAnswers] = useState(new Array(length).fill(''))
    const [result, setResult] = useState(new Array(length).fill(0))
    const [position, setPosition] = useState(0)
    const [curNumbers] = useSliceData(numbers, columnCount - 1, position)
    const [curAnswers, setCurAnswers] = useSliceData(answers, columnCount - 1, position)
    const [inputDisabled, setInputDisabled] = useState(true)
    const {user} = useContext(userContext)
    const container = useRef(null)
    const kraepelinInputs = useRef(null)
    const submitButton = useRef(null)
    const [answer, setAnswer] = useState({
        change: 0,
        count: 0,
        countPerMinute: [],
        changePerMinute: []
    })
    const [timer, timesUp] = useTimer(time, () => submitButton.current.click(), setAnswer)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
    }, [])

    useEffect( () => {
        container.current.style.transform = `translateY(-${position % (curNumbers?.length - 1)*11}0px)`
        if (position >= length) {
            setPosition(0)
        }
        // else if (position > 0 && position % (curNumbers.length - 1) == 0) {
        //     setCurNumbers(numbers.slice(position, position + columnCount))
        // }
        setTimeout(() => setInputDisabled(false), 0)
    },[position])

    const handleInput = async e => {
        setInputDisabled(true)
        const val = parseInt(e.target.value)
        if (handleDown()) {
            setCurAnswers(prev => {
                prev[position % (columnCount - 1)] = val
                return prev
            })
            setAnswers(prev => {
                if (prev[position] != '') setAnswer({...answer, change: answer.change + 1})
                else setAnswer({...answer, count: answer.count + 1})
                prev[position] = val
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
        if (position % columnCount === columnCount - 1) setPosition(prev => prev - columnCount + 1)
        else setPosition(prev => prev - 1)
    }
    const handleDown = () => {
        if (position >= length) {
            return false
        }
        setPosition(prev => prev + 1)
        return true
    }
    const handleSubmit = async () => {
        const context = {
            user: user.id,
            timeleft: timer,
            numeral_system: numberFormatString,
            results: result.toString(),
            answers: answers.toString(),
            numbers: numbers.toString(),
            columnCount: columnCount,
            elapsed_time: time - timer
        }
        const response = await fetch(`${baseUrl}/api/kraepelin/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrf()
            },
            body: JSON.stringify(context)
        })
        const data = await response.json()
        console.log(data)
        
    }

    return (
        <div className='kraepelin' >
            <div className='container' >
                <div className={inputDisabled ? 'answer-line flash' : 'answer-line'}></div>
                <div className='kraepelin-numbers' ref={container}>
                    {curNumbers?.map((l, i) =>                  
                    <li key={i}>
                        {numberFormat[l]}
                        {i < curNumbers.length - 1 && 
                        <p>{curAnswers[i]}</p>
                        }                       
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

            <Prompt when={time < 30}  message={(location, action) => 
            location.pathname.startsWith("/result") ? "Are you sure?" : "Are you sure you want to leave?"}/>

            <Link onClick={handleSubmit} ref={submitButton} className='submitKraepelin' to={{
                    pathname: "/result",
                    state: {
                        user: user.id,
                        timeleft: timer,
                        numeral_system: numberFormatString,
                        results: result,
                        answers: answers,
                        numbers: numbers,
                        columnCount: columnCount,
                        elapsed_time: time - timer,
                        answer: answer
                    }
                }} replace>
                    <p>{timer}</p>
                    SUBMIT
            </Link>

        </div>
    )
}

