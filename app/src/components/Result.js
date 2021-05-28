import React, { useEffect } from 'react'
import {Chart, Scatter, Pie, Radar} from 'react-chartjs-2'
import { useHistory, useLocation, Link } from 'react-router-dom'


export const Result = () => {
    const history = useHistory()
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
    useEffect(() => console.log(history), [])

    return (
        <main>
            <Scatter className="scatter-chart" data={scatterData} options={scatterOptions}/>
            <Pie className="pie-chart" data={pieData} options={pieOptions}/>
            <Link to="/">back</Link>
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

    const accuracy = correct.length / result.length

    return {
        scatterData, 
        pieData, 
        accuracy, 
        correct: correct.length,
        wrong: wrongs.length,
        empty: empty.length
    }
}