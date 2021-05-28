import React, { useEffect } from 'react'
import {Chart, Scatter, Pie, Radar} from 'react-chartjs-2'
import { useLocation } from 'react-router'


export const Result = () => {
    const {result} = useLocation().state
    const {scatterData, pieData} = formatData(result)
    const scatterOptions = {
        parsing: false,
        animation: false,
        scales: {
            xAxes: {
                ticks: {
                    padding: 0
                }
            }
        }
    }
    const pieOptions = {
        elements: {
            arc: {
                borderWidth: 0
            }
        }
    }
    useEffect(() => console.log(result), [])

    return (
        <main>
            <Scatter data={scatterData} options={scatterOptions}/>
            <Pie data={pieData} options={pieOptions}/>
        </main>
    )
}

const formatData = (result, columnCount = 100) => {
    let correct = []
    let empty = []
    let wrongs = []

    for (let i = 0; i < result.length; i++) {
        const val = result[i]      
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