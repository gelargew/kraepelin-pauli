import React, { useEffect, useState } from 'react'


export const ToggleTheme = () => {
    const [dark, setDark] = useState(true)
    useEffect(() => {
    console.log(dark)
    document.querySelector('html').setAttribute('color-scheme', dark ? 'dark' : 'light')
    },[dark])

    return (
    <input className='theme-toggler' type="checkbox" 
    onChange={() => setDark(!dark)} title="Toggle color scheme" />
        )
}