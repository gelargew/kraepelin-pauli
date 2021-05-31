import { useState, useReducer, useEffect } from 'react'

export { useFetchReducer }

const useFetchReducer = (initialState, reducer) => {
    const [state, setState] = useState(initialState)
    const [{context, perform, performError, timestamp}, dispatchContext] = useReducer(reducer, {})

    useEffect(async () => {
        //prevent first effect
        if (!context) return
        try {
            const response = await fetch(...context)
            perform && perform(response.status)
            const data = await response.json()
            setState(data)
            //if need to do something after fetch success
        }
        
        catch (e) {
            performError && performError()
        } 
    },[context, timestamp])

    return [state, dispatchContext]
}