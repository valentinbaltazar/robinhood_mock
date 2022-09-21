// import { CompareArrowsOutlined } from '@material-ui/icons';

import React, { useEffect, useState } from 'react'
import './Stats.css'
import StatsRow from './StatsRow.js'
import { db } from './firebase'
import axios from "axios";

const testData = [];

function Stats() {


    const [stockData, setstockData] = useState([])
    const [myStocks, setmyStocks] = useState([])


    const getMyStocks = () => {
        db
            .collection('myStocks')
            .onSnapshot(snapshot => {
                let promises = [];
                let tempData = []
                snapshot.docs.map((doc) => {
                    promises.push(getStocksData(doc.data().ticker)
                        .then(res => {

                            console.log(doc.data().ticker)
                            console.log(res)

                            tempData.push({
                                id: doc.id,
                                data: doc.data(),
                                info: res.data
                            })
                        })
                    )
                })
                Promise.all(promises).then(() => {
                    console.log(tempData)
                    setmyStocks(tempData);
                })
            })
    }


    const TOKEN = "ccl4ri2ad3i7ei0cavqgccl4ri2ad3i7ei0cavr0"
    const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
    const KEY_URL = `&token=${TOKEN}`;

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    // Call to Finnhub API
    async function getStocksData(stock) {
        // await delay(1000);
        return axios
            .get(`${BASE_URL}${stock}${KEY_URL}`)
            .catch((error) => {
                console.error("Error", error.message);
            });
    };

    useEffect(() => {

        const stockList = ["AAPL", "MSFT", "TSLA", "META", "BABA", "UBER", "DIS", "SPY", "QQQ", "AMZN", "SHEL"];

        getMyStocks();

        let promises = [];

        stockList.map((stock) => {
            promises.push(
                getStocksData(stock)
                    .then((res) => {
                        testData.push({
                            symbol: stock,
                            ...res.data
                        });
                    })
            )
        });

        Promise.all(promises).then(() => {
            console.log(testData);
            setstockData(testData);
        })



    }, []);


    return (
        <div className='stats'>
            <div className='stats__container'>
                <div className='stats__header'>
                    <p>Stocks</p>
                </div>
                <div className='stats__content'>
                    <div className='stats__rows'>

                        {myStocks.map((stock) => (
                            <StatsRow
                                key={stock.data.ticker}
                                volume={stock.data.shares}
                                symbol={stock.data.ticker}
                                openPrice={stock.info.o}
                                price={stock.info.c}
                                type="sell"
                            />
                        ))}


                    </div>
                </div>

                <div className='stats__header stats__list'>
                    <p>List</p>
                </div>
                <div className='stats__content'>
                    <div className='stats__rows'>
                        {/* stocks to buy */}

                        {stockData.map((stock) => (
                            <StatsRow
                                key={stock.symbol}
                                symbol={stock.symbol}
                                openPrice={stock.o}
                                price={stock.c}
                                type="buy"
                            />
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Stats
