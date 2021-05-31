import React, { useEffect } from 'react'

export { ToggleTheme }
 
const ToggleTheme = ({darkTheme, setDarkTheme }) => {
    useEffect(() => {
    document.querySelector('html').setAttribute('color-scheme', darkTheme ? 'dark' : 'light')
    },[darkTheme])

    return (
    <input className='theme-toggler' type="checkbox" 
    onChange={() => setDarkTheme(!darkTheme)} title="Toggle color scheme" />
        )
}
