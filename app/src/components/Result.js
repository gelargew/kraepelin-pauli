import React, { useEffect } from 'react'
import {Chart, Scatter, Pie} from 'react-chartjs-2'


export const Result = () => {
    
    const {scatterData, pieData} = formatData()
    const scatterOptions = {
        parsing: false,
        animation: false
    }
    const pieOptions = {
        elements: {
            arc: {
                borderWidth: 0
            }
        }
    }
    useEffect(() => console.log(scatterData, pieData), [])

    return (
        <main>
            <Scatter data={scatterData} options={scatterOptions}/>
            <Pie data={pieData} options={pieOptions}/>
        </main>
    )
}

const formatData = (result, columnCount=100) => {
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
    const scatterData = {
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
    const pieData = {
        datasets: [
            {
                data: [correct.length, wrongs.length, empty.length],
                backgroundColor: ['green', 'red', 'yellow']
            }
        ],
        labels: ['correct', 'wrong', 'empty']
    }
    return {scatterData, pieData}
}