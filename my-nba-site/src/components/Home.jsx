import React, { useEffect, useState, useRef } from 'react';
import Game from './Game';
import '../sass/game.scss';

const Home = () => {
    const [todaysGameData, setTodaysGameData] = useState([]);
    const [begin, setBegin] = useState(0);
    const [end, setEnd] = useState(4);
    const [isScrolling, setIsScrolling] = useState(false);
    // provides the horizontal coordinate within the application viewport at which the event occurred (current view of window)
    const [clickStartX, setClickStartX] = useState();
    const [scrollStartX, setScrollStartX] = useState();
    const drag = useRef(null);
    const dragCurrent = drag.current;

    useEffect(() => {
        fetch('https://www.balldontlie.io/api/v1/games/?start_date=2020-12-01&end_date=2020-12-01')
        .then((res) => res.json())
        .then((data) => {
            setTodaysGameData(data.data)
        })
        }, [])

        const onMouseDown = (e) => {
            setClickStartX(e.screenX);
            setScrollStartX(drag.current.scrollLeft)
        }
    
        const onMouseUp = (e) => {
            if(clickStartX !== undefined) {
                setClickStartX(undefined);
                setScrollStartX(undefined);
            }
        }
    
        const onMouseMove = (e) => {
            if(clickStartX !== undefined && scrollStartX !== undefined) {
                const touchDelta = clickStartX - e.screenX;
                drag.current.scrollLeft = scrollStartX + touchDelta;
            }
        }

    const onMouseLeave = () => {
        if(clickStartX !== undefined) {
            setClickStartX(undefined);
            setScrollStartX(undefined);
        }
    }


    return (
        <div className='homeContainer'>
            <h1>NBA Central</h1>
            <div className='gameCardContainer' 
                id='gameCardContainer'
                ref={drag}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                
            >
                {todaysGameData.length ? 
                todaysGameData.map((game, index) => {
                    return(
                        <Game key={index} id={index} gameData={game} />
                    )
                }) : ''}
            </div>
        </div>
    )
}

export default Home;