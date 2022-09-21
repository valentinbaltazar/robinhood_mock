import React, { useState } from 'react'
import './Newsfeed.css'
import LineGraph from './LineGraph'
import TimeLine from './TimeLine'
import Chip from '@material-ui/core/Chip';
import { Avatar } from "@material-ui/core";
import './Chip.css'


function Newsfeed() {

    const [popularTopics, setTopics] = useState([
        "Technology",
        "Top Movies",
        "Upcoming Earnings",
        "Crypto",
        "Cannabis",
        "Healthcare Supplies",
        "Index ETFs",
        "Technology",
        "China",
        "Pharma",
    ]);

    return (
        <div className='newsfeed'>
            <div className='newsfeed_container'>
                <div className='newsfeed__chartSection'>
                    <div className='newsfeed__portfolio'>
                        <h1>$100,420.69</h1>
                        <p>+$142.70 (+0.05%) Today</p>
                    </div>
                    <div className='newsfeed__chart'>
                        <LineGraph />
                        <TimeLine />
                    </div>
                </div>

                <div className="newsfeed__buying__section">
                    <h2> Buying Power</h2>
                    <h2> $4.11</h2>
                </div>


                <div className="newsfeed__market__section">
                    <div className="newsfeed__market__box">
                        <p> Markets Closed</p>
                        <h1> Happy Thanksgiving</h1>
                    </div>
                </div>
                <div className="newsfeed__popularlists__section">
                    <div className="newsfeed__popularlists__intro">
                        <h1>Popular lists</h1>
                        <p>Show More</p>
                    </div>
                    <div className="newsfeed_popularlists_badges">
                        {popularTopics.map((topic) => (
                            <Chip
                                className="topic__badge"
                                // variant="outlined"
                                label={topic}
                                avatar={<Avatar
                                    src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                                />}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Newsfeed
