import React, { useEffect, useState } from 'react';
import Game from './Game';
import '../sass/game.scss';

const Home = () => {
    const [todaysGameData, setTodaysGameData] = useState([]);
    const [begin, setBegin] = useState(0);
    const [end, setEnd] = useState(4);
    useEffect(() => {
        fetch('https://www.balldontlie.io/api/v1/games/?start_date=2017-02-01&end_date=2017-02-01')
        .then((res) => res.json())
        .then((data) => {
            setTodaysGameData(data.data)
        })
        }, [])

        const handleClickNext = () => {
            setEnd((end) => end + 1);
            setBegin((begin) => begin + 1);
        }

        const handleClickPrev = () => {
            setEnd((end) => end - 1);
            if(begin >= 0) setBegin((begin) => begin - 1);
        }

    return (
        <div className='homeContainer'>
            <h1>NBA Central</h1>
            <div class='gameCardContainer'>
                {begin >= 1 ? <button className='prevBtn' onClick={handleClickPrev}>Prev</button> : ''}
                {todaysGameData.length ? 
                todaysGameData.slice(begin, end).map((game, index) => {
                    return(
                        <Game key={index} id={index} gameData={game} />
                    )
                }) : ''}
                {end <= (todaysGameData.length - 4) ? <button className='nextBtn' onClick={handleClickNext}>Next</button> : ''}
            </div>
        </div>
    )
}

export default Home;