import React, { useEffect } from 'react'
import {Chart, Scatter, Pie, Radar} from 'react-chartjs-2'
import { useHistory, useLocation, Link } from 'react-router-dom'


export const Result = () => {
    const history = useHistory()
    const data = useLocation().state
    const {scatterData, pieData} = formatData(data.results)
    const scatterOptions = {
        parsing: false,
        animation: false,
        scales: {
            x: {
                min: 1,
                ticks: {
                    beginAtZero: false,
                    padding: 0
                }
            },
            y: {
                min: 1,
                display: false
            }
        }
    }
    const pieOptions = {
        elements: {
            arc: {
                borderWidth: 0
            }
        },
    }
    return (
        <main className='result-page'>
            <button onClick={() => console.log(data)}>showdata</button>
            <div className='scatter-chart-wrapper'>
                <Scatter className="scatter-chart" data={scatterData} options={scatterOptions}/>
            </div>
            <div className='scatter-chart-wrapper'>
                <Pie className="pie-chart" data={pieData} options={pieOptions}/>
            </div>
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
            x: parseInt(i / columnCount) + 1,
            y: i % columnCount + 1
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