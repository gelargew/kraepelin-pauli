import React, { useEffect, useState } from 'react'


export const ToggleTheme = () => {
    const [dark, setDark] = useState(true)
    useEffect(() => 
    document.querySelector('html').setAttribute('color-scheme', dark ? 'dark' : 'light')
    ,[dark])

    return <button onClick={() => setDark(!dark)}>theme</button>
}