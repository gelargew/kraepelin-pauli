import { useState, useReducer, useEffect } from 'react'

export { useFetch }

const useFetch = (initialState, reducer) => {
    const [state, setState] = useState(initialState)
    const [{context, perform, performError}, dispatchContext] = useReducer(reducer, null)

    useEffect(async () => {
        //prevent first effect
        if (!context) return
        const response = await fetch(...context)
        try {
            const data = await response.json()
            setState(data)
            //if need to do something after fetch success
            console.log(perform, context, performError)
        }
        catch (e) {
            if ('performError' in dispatchContext) dispatchContext.performError()
        } 
    },[context])

    return [state, dispatchContext]
}