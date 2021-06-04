import React, { useContext, useEffect } from 'react'
import {Chart, Scatter, Pie, Radar, Line} from 'react-chartjs-2'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { userContext } from './App'
import { chartColor } from './utils'



export const Result = () => {
    const {darkTheme} = useContext(userContext)
    const [green, yellow, red] = chartColor(darkTheme)
    const data = useLocation().state
    const {
        scatterData, 
        pieData, 
        accuracy,
        answered
    } = formatData(data.results, data.columnCount, green, yellow, red)
    
    return (
        <main className='result-page'>
            
            <div className='pie-chart-wrapper'>
                <Pie className="pie-chart" data={pieData} options={pieOptions}/>
            </div>
            <div className='result-detail'>
                <p>
                    <strong>Your Result:</strong><hr/>
                    answered: {answered}/{data.results.length} <br/>
                    Accuracy : {accuracy}% <br/>
                    timeleft: {data.timeleft} seconds <br/>
                    elapsed time: {data.elapsed_time} <br/>
                    speed: {(answered/data.elapsed_time).toFixed(1)} number/seconds
                </p>
            </div>
            <div className='scatter-chart-wrapper'>
                <div>
                    <Scatter className="scatter-chart" data={scatterData} options={scatterOptions(data.results.length)}/>
                </div>
            </div>
            <div className='line-chart-wrapper'>
                <div>
                    <Line className='line-chart' data={lineData(data.answer)}/>
                </div>
            </div>
        </main>
    )
}



const formatData = (result, columnCount = 100, green, yellow, red) => {
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
                backgroundColor: green
            },
            {
                label: 'wrong',
                data: wrongs,
                backgroundColor: red
            },
            {
                label: 'empty',
                data: empty,
                backgroundColor: yellow
            }
        ]
    }
    const pieData = {
        datasets: [
            {
                data: [correct.length, wrongs.length, empty.length],
                backgroundColor: [green, red, yellow]
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
        empty: empty.length,
        answered: correct.length + wrongs.length
    }
}

const lineData = ({count, change, countPerMinute, changePerMinute}) => {
    const data = {
        datasets: [
            {
                label: 'answerPerMinute',
                data: countPerMinute,
                borderColor: 'green',
            },
            {
                label: 'changePerMinute',
                data: changePerMinute,
                borderColor: 'teal'
            }
        ]
    }
    return data
}

const scatterOptions = length => {
    return {
    plugins: {
        legend: {
            display: false
        }
    },
    parsing: false,
    animation: false,
    scale: {
        ticks: {
            precision: 0
        }
    },
    scales: {
        x: {
            display: length > 666,
            min: 0,
        },
        y: {
            min: 1
        }
    }
}}
const pieOptions = {
    elements: {
        arc: {
            borderWidth: 0
        }
    },
    plugins: {
       legend: {
           display: false
       }
    }
}
