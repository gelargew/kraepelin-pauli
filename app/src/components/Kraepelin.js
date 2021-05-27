import React, { useEffect, useState, useRef } from 'react'
import {Prompt, useLocation} from 'react-router-dom'


export const Kraepelin = () => {
    const {length, numberFormat, columnCount, time} = useLocation().state
    const [numbers , setNumbers] = useState(randomArray({length: length + 1}))
    const [answers, setAnswers] = useState(new Array(length))
    const [result, setResult] = useState(new Array(length))
    const [position, setPosition] = useState(0)
    const [curNumbers, setCurNumbers] = useState(numbers.slice(0, columnCount))
    const container = useRef(null)
    const kraepelinInputs = useRef(null)
    const [inputDisabled, setInputDisabled] = useState(true)
    const data = useLocation()

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        console.log(data.state)
    }, [])

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
        if (position >= length) {
            return false
        }
        setPosition(prev => prev + 1)
        return true
    }

    return (
        <div className='kraepelin' >
            {/* <button onClick={() => {
                console.log(answers)
                console.log(result)
            }}>submit</button> */}
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
            location.pathname.startsWith("/end") ? true : "Are you sure you want to leave?"} />
        </div>
    )
}

const getRandomInt = (max=10) => Math.floor(Math.random() * max)



const randomArray = ({max=10, length=50}) => [... new Array(length)].map(() => getRandomInt(max))