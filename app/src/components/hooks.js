import { useState, useReducer, useEffect } from 'react'

export { useFetch }

const useFetch = (initialState, reducer) => {
    const [state, setState] = useState(initialState)
    const [context, dispatchContext] = useReducer(reducer, null)

    useEffect(async () => {
        //prevent first effect
        if (!context) return
        const response = await fetch(...context)
        console.log(response)
        const data = await response.json()
        setState(data)
    },[context])

    return [state, dispatchContext]
}