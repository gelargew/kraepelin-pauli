import { useState, useReducer, useEffect } from 'react'
import { sumArray } from './utils'

export { useFetchReducer, useTimer, useSliceData }

const useFetchReducer = (initialState, reducer) => {
    const [state, setState] = useState(initialState)
    const [{context, perform, performError, timestamp}, dispatchContext] = useReducer(reducer, {})

    useEffect(async () => {
        //prevent first effect
        if (!context) return
        try {
            const response = await fetch(...context)
            if (typeof perform === 'function') perform(response.status)
            try {
                const data = await response.json()
                setState(data)
            }
            catch (e) {
                console.log('no data')
            }
            //if need to do something after fetch success
        }
        
        catch (e) {
            if (typeof performError === 'function') performError()
        } 
    },[context, timestamp])

    return [state, dispatchContext]
}

const useTimer = (initialState, callback, setAnswer) => {
    const [counter, setCounter] = useState(initialState)
    const [timesUp, setTimesUp] = useState(false)
    useEffect(() => {
        if (counter > 0) {
            setTimeout(() =>  setCounter(counter - 1), 1000)
            if (counter % 10 === 0) {
                setAnswer(prev => {
                    let priorCount = prev.countPerMinute.reduce(sumArray, 0)
                    prev.countPerMinute.push(prev.count - priorCount)
                    let priorChange = prev.changePerMinute.reduce(sumArray, 0)
                    prev.changePerMinute.push(prev.change - priorChange)
                    console.log(prev)
                    return prev
                })
            }
        }         
        else {
            setTimesUp(true)
            if (typeof callback === 'function') callback()
        }
    }, [counter])

    return [counter, timesUp]
}

const useSliceData = (data, range, position) => {
    const [state, setState] = useState([])
    useEffect(() => {
        if(position % range != 0) return  
        setState(data.slice(position, position + range + 1))
    }, [position])

    return [state, setState]
}