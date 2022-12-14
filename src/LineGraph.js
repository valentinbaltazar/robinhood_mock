import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import './LineGraph.css'
// import 'chart.js/auto'
// import { display } from '@mui/system';



function LineGraph() {


    const [graphData, setGraphData] = useState([]);

    const createMockData = () => {
        let data = [];
        let value = 50;

        for (var i = 0; i < 366; i++) {
            let date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(i);
            value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
            data.push({ x: date, y: value });
        };

        setGraphData(data);
    }

    useEffect(() => {
        createMockData();
    }, [])



    // const data = [{ x: 5, y: 20 }, { x: 20, y: 45 }, { x: 40, y: 99 }]

    return (
        <div className='linegraph'>
            <Line data={{
                datasets: [{
                    type: "line",
                    data: graphData,
                    backgroundColor: "black",
                    borderColor: "#5AC53B",
                    borderWidth: 2,
                    pointBorderColor: 'rgba(0, 0, 0, 0)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                    pointHoverBackgroundColor: '#5AC53B',
                    pointHoverBorderColor: '#000000',
                    pointHoverBorderWidth: 4,
                    pointHoverRadius: 6
                }]
            }}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false

                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {
                                format: "MM/DD/YY",
                                tooltipFormat: "ll"
                            },
                            ticks: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false,
                                beginAtZero: true
                            }
                        }]
                    }
                }} />
        </div>
    )
}

export default LineGraph
