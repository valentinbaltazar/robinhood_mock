import React from 'react'
import './StatsRow.css'
import StockSVG from './images/stock.svg'
import { db } from './firebase';

function StatsRow(props) {
    const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

    const checkSign = (((props.price - props.openPrice) / props.openPrice) * 100) >= 0 ? "green" : "red"

    const buyStock = () => {
        console.log("buy", props.symbol)

        db.collection("myStocks").where("ticker", "==", props.symbol)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        // Update record
                        console.log(doc.id, " => ", doc.data());
                        db.collection("myStocks")
                            .doc(doc.id)
                            .update({
                                shares: doc.data().shares += 1
                            })

                    })
                }
                else {
                    // Add new record
                    console.log("Adding Stock To Portfolio")

                    db.collection("myStocks")
                        .add({
                            ticker: props.symbol,
                            shares: 1
                        })


                }


            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


    }

    const sellStock = () => {
        console.log("sell", props.symbol)

        db.collection("myStocks").where("ticker", "==", props.symbol)
            .get()
            .then((querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    console.log(doc)
                    // Update record
                    console.log(doc.id, " => ", doc.data());
                    db.collection("myStocks")
                        .doc(doc.id)
                        .update({
                            shares: doc.data().shares > 0 ? doc.data().shares -= 1 : 0
                        })
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }



    return (
        <div className="row" onClick={props.type === "buy" ? buyStock : sellStock}>
            <div className="row__intro">
                <h1>{props.symbol}</h1>
                <p>
                    {props.volume &&
                        (props.volume + " shares")
                    }
                </p>
            </div>

            <div className="row__chart">
                <img src={StockSVG} height={16} />
            </div>

            <div className="row__numbers">
                <p className="row__price">{props.price}</p>
                <p className={`row__percentage ${checkSign}`}> {Number(percentage).toFixed(2)}% </p>
            </div>
        </div>
    )
}

export default StatsRow
