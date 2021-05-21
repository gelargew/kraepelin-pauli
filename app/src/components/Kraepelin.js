import React, { useEffect, useState } from 'react'


export const Kraepelin = () => {
    const [number , setNumber] = useState('')
    const [score, setScore] = useState(0)
    const [q, setQ] = useState(getRandomInt)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)

    }, [])

    const handleInput = e => {
        setNumber(e.target.value)
    }

    const handleKeyup = e => {
        const val = e.code.slice(-1)
        if (!isNaN(val)) {
            setNumber(val)
            return
        }
        const arrow = e.code
        if (arrow === 'ArrowRight') {
            setNumber(arrow)
        }
        else if (arrow === 'ArrowLeft') setNumber(arrow)

    }

    return (
        <div className='kraepelin'>
            <h3>score: {score} </h3>

            <h3>{q[0]} + {q[1]} =</h3>

            <div className='kraepelin-numbers'>
                <h1>{number}</h1>
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

const getRandomInt = () => [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]