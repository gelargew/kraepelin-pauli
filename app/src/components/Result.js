import React, { useEffect } from 'react'
import {Chart, Scatter} from 'react-chartjs-2'


export const Result = () => {
    
    const data = scatterData()
    const options = {
        animation: false,
        parsing: false,
        plugins: {
            decimation: {
                enabled: false,
                algorithm: 'min-max',
              }
        },
    }
    useEffect(() => console.log(data), [])

    return (
        <main>
            <Scatter data={data} options={options}/>
        </main>
    )
}

const scatterData = (result, columnCount=100) => {
    let correct = []
    let empty = []
    let wrongs = []
    const arr = new Array(5000)
    arr[120] = 1
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i]      
        const xy = {
            x: parseInt(i / columnCount),
            y: i % columnCount
        }
        if (val === 1) correct.push(xy)
        else if (val === -1) wrongs.push(xy)
        else empty.push(xy)
    }
    const data = {
        datasets: [
            {
                label: 'correct',
                data: correct,
                backgroundColor: 'green'
            },
            {
                label: 'wrong',
                data: wrongs,
                backgroundColor: 'red'
            },
            {
                label: 'empty',
                data: empty,
                backgroundColor: 'yellow'
            }
        ]
    }
    return data
}