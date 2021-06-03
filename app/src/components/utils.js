import { useEffect, useState } from "react"

export {getCsrf, getRandomInt, randomArray, chartColor}

const getRandomInt = (max=10) => Math.floor(Math.random() * max)
const randomArray = ({max=10, length=50}) => [... new Array(length)].map(() => getRandomInt(max))

const getCsrf = () => {
    const name = 'csrftoken'
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const chartColor = darkTheme => {
    console.log(darkTheme)
    const [[green, yellow, red], setColor] = useState(
        darkTheme ? ['#29c7ac', '#E94560', '#EDE680'] : ['green', 'yellow', 'red'])
    useEffect(() => setColor(
        darkTheme ? ['#29c7ac', '#E94560', '#EDE680'] : ['green', 'yellow', 'red']), [darkTheme])
    
    return [green, yellow, red]
}