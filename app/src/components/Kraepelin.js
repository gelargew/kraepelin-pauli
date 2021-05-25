import React, { useEffect, useState, useRef } from 'react'


export const Kraepelin = () => {
    const [number , setNumber] = useState(randomArray({length: 5000}))
    const [answers, setAnswers] = useState(new Array(100))
    const [result, setResult] = useState(new Array(100))
    const [position, setPosition] = useState(0)
    const [curNumber, setCurNumber] = useState(number.slice(0, 20))
    const container = useRef(null)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        console.log(number)

    }, [])

    useEffect( () => {
        container.current.style.transform = `translateY(-${position%19*8}0px)`
        if (position > 0 && position % 19 == 0) {
            setCurNumber(number.slice(position+1, position+21))
        }
    },[position])

    const handleInput = async e => {
        const val = e ? parseInt(e.target.value) : '0'
        setPosition(prev => prev + 1)
        setAnswers(prev => {
            prev[position] = val
            return prev
        })
    }

    const handleKeyup = e => {
        const val = e.code.slice(-1)
        

        if (!isNaN(val)) {
            console.log(position)
        }

    }

    return (
        <div className='kraepelin' >
            <div className='container' >
                <div className='answer-line'></div>
                <div className='kraepelin-numbers' ref={container}>
                    {curNumber.map((l, i) =>                  
                    <li key={i}>
                        {l}
                        <p>{answers[i]}</p>
                    </li>
                    )}
                </div>
            </div>

            <div className='kraepelin-inputs'>
                {[1,2,3,4,5,6,7,8,9].map(num => <button key={num} onClick={handleInput} className='kraepelin-input' value={num}>{num}</button>)}
                <button className='kraepelin-input'>left</button>
                <button className='kraepelin-input'>0</button>
                <button className='kraepelin-input'>right</button>
            </div>
        </div>
    )
}

const getRandomInt = (max=10) => Math.floor(Math.random() * max)



const randomArray = ({max=10, length=50}) => [... new Array(length)].map(() => getRandomInt(max))