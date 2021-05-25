import React, { useEffect, useState, useRef } from 'react'


export const Kraepelin = () => {
    const [number , setNumber] = useState(randomArray({length: 4900}))
    const [point, setPoint] = useState({X: 0, Y: 0})
    const [curNumber, setCurNumber] = useState(number.slice(0, 100))
    const container = useRef(null)

    useEffect(() => {
        document.addEventListener('keyup', handleKeyup)
        console.log(number)

    }, [])

    const handleInput = e => {
        setPoint({...point, Y: point.Y - 100})
        setNumber([...number, e.target.value])
        container.current.style.transform = `translate(${point.X}px, ${point.Y}px)`
    }

    const handleKeyup = e => {
        const val = e.code.slice(-1)
        setPoint({...point, Y: point.Y - 100})
        container.current.style.transform = `translate(${point.X}px, ${point.Y}px)`
        

        if (!isNaN(val)) {
            console.log(point)
        }

    }

    return (
        <div className='kraepelin' >
            <div className='container' >
                <div className='kraepelin-numbers' ref={container}>
                    {curNumber.map((l, i) => <li key={i}>
                        {l} {l} {i}
                    </li>)}
                

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