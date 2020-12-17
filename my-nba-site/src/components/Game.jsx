import React from 'react';
import moment from 'moment';
import '../sass/game.scss';

const Game = ({gameData}) => {
    var date = new Date(gameData.date);
    date = moment(date).format('MM-DD-YYYY');
    var visitorImg = '';
    var homeImg = '';

    if(gameData.home_team.full_name && gameData.visitor_team.full_name) {
        visitorImg = `http://nba4free.com/nba/logo-${gameData.visitor_team.full_name.toLowerCase().split(' ').join('-')}.svg`;
        homeImg = `http://nba4free.com/nba/logo-${gameData.home_team.full_name.toLowerCase().split(' ').join('-')}.svg`;
    }
    return (
        <div class='gameCard'>
            <p>{gameData.home_team.full_name} vs. {gameData.visitor_team.full_name}</p>
            <div class='teamImages'>
                <img src={homeImg} alt={gameData.home_team.full_name} />
                <img src={visitorImg} alt={gameData.visitor_team.full_name} />
            </div>
            <div className='gameScore'>
                <p>{gameData.home_team_score}</p>
                <p>{gameData.visitor_team_score}</p>
            </div>
        </div>
    )
}

export default Game;