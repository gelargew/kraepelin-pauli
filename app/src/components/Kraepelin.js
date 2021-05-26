import React, { useEffect, useState, useRef } from 'react'


export const Kraepelin = ({
    kraepelinLength = 5000
}) => {
    const [number , setNumber] = useState(randomArray({length: kraepelinLength}))
    const [answers, setAnswers] = useState(new Array(100))
    const [result, setResult] = useState(new Array(100))
    const [position, setPosition] = useState(0)
    const [curNumber, setCurNumber] = useState(number.slice(0, 20))
    const container = useRef(null)
    const kraepelinInputs = useRef(null)
    const [inputDisabled, setInputDisabled] = useState(true)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        const x = window.matchMedia("(prefers-color-scheme: light)")
        console.log(x)
    }, [])

    useEffect( () => {
        container.current.style.transform = `translateY(-${position % (curNumber.length - 1)}00px)`
        if (position > 0 && position % (curNumber.length - 1) == 0) {
            setCurNumber(number.slice(position, position + curNumber.length))
        }
        setTimeout(() => setInputDisabled(false), 300)
    },[position])

    const handleInput = async e => {
        setInputDisabled(true)
        const val = e ? parseInt(e.target.value) : '0'
        setPosition(prev => prev + 1)
        setAnswers(prev => {
            prev[position] = val
            console.log(answers[position])
            return prev
        })
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

    return (
        <div className='kraepelin' >
            <div className='container' >
                <div className={inputDisabled ? 'answer-line flash' : 'answer-line'}></div>
                <div className='kraepelin-numbers' ref={container}>
                    {curNumber.map((l, i) =>                  
                    <li key={i}>
                        {l}
                        <p>{answers[parseInt(position/curNumber.length)*(curNumber.length - 1) + i]}</p>
                    </li>
                    )}
                </div>
            </div>

            <div className='kraepelin-inputs' ref={kraepelinInputs}>
                {[1,2,3,4,5,6,7,8,9].map(num => 
                <button key={num} onClick={handleInput} 
                className='kraepelin-input' value={num} disabled={inputDisabled}>
                    {num}
                </button>)}
                <button className='kraepelin-input' onClick={() => setPosition(prev => prev - 1)} disabled={inputDisabled}>
                    <i className="fas fa-chevron-up fa-2x"></i>
                </button>
                <button className='kraepelin-input' onClick={handleInput} value="0" disabled={inputDisabled}>0</button>
                <button className='kraepelin-input' onClick={() => setPosition(prev => prev + 1)} disabled={inputDisabled}>
                    <i className="fas fa-chevron-down fa-2x"></i>
                </button>
            </div>
        </div>
    )
}

const getRandomInt = (max=10) => Math.floor(Math.random() * max)



const randomArray = ({max=10, length=50}) => [... new Array(length)].map(() => getRandomInt(max))