import { useState, useReducer, useEffect } from 'react'

export { useFetchReducer, useTimer }

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

const useTimer = (initialState, callback) => {
    const [counter, setCounter] = useState(initialState)
    const [timesUp, setTimesUp] = useState(false)
    useEffect(() => {
        if (counter > 0) setTimeout(() => setCounter(counter - 1), 1000) 
        else {
            setTimesUp(true)
            if (typeof callback === 'function') callback()
        }
    }, [counter])

    return [counter, timesUp]
}