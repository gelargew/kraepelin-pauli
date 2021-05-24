import React, { useEffect, useState } from 'react'


export const Kraepelin = () => {
    const [number , setNumber] = useState([randomArray(), randomArray()])
    const [point, setpoint] = useState({X: 0, Y: 0})
    const [score, setScore] = useState(0)
    const [q, setQ] = useState(getRandomInt)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        console.log(number)

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
            <div className='kraepelin-numbers'>
                {true && 
                <>
                    <p className='top-left'>toplef</p>
                    <p className='top-right'>topri</p>

                </>}
                <p className='mid-mid'>ans</p>

                {true && 
                <>
                    
                    <p className='bot-right'>botrig</p>
                </>}
            

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

const randomArray = (max=10, length=50) => [... new Array(length)].map(() => getRandomInt(max))