import React, { useEffect, useState, useRef } from 'react'


export const Kraepelin = ({
    kraepelinLength = 5000,
    columnCount = 100
}) => {
    const [numbers , setNumbers] = useState(randomArray({length: kraepelinLength + 1}))
    const [answers, setAnswers] = useState(new Array(kraepelinLength))
    const [result, setResult] = useState(new Array(kraepelinLength))
    const [position, setPosition] = useState(0)
    const [curNumbers, setCurNumbers] = useState(numbers.slice(0, columnCount))
    const container = useRef(null)
    const kraepelinInputs = useRef(null)
    const [inputDisabled, setInputDisabled] = useState(true)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        const x = window.matchMedia("(prefers-color-scheme: light)")
        console.log(x)
    }, [])

    useEffect( () => {
        container.current.style.transform = `translateY(-${position % (curNumbers.length - 1)}00px)`
        if (position >= kraepelinLength) {
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
        if (position >= kraepelinLength) {
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
                        {l}-{i}
                        <p>{answers[parseInt(position/curNumbers.length)*(curNumbers.length - 1) + i]} {i}</p>
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
                <button className='kraepelin-input' onClick={handleUp} disabled={inputDisabled}>
                    <i className="fas fa-chevron-up fa-2x"></i>
                </button>
                <button className='kraepelin-input' onClick={handleInput} value="0" disabled={inputDisabled}>0</button>
                <button className='kraepelin-input' onClick={handleDown} disabled={inputDisabled} title="down">
                    <i className="fas fa-chevron-down fa-2x"></i>
                </button>
            </div>
        </div>
    )
}

const getRandomInt = (max=10) => Math.floor(Math.random() * max)



const randomArray = ({max=10, length=50}) => [... new Array(length)].map(() => getRandomInt(max))