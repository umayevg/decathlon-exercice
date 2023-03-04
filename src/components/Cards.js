import React from 'react';
import Card from "./Card";

const Cards = ({games, fetchGame}) => {
    return (
        <div className="cards">
            {games.map(game => (
                <Card key={game.id} game={game} fetchGame={fetchGame}/>
            ))}
        </div>
    );
};

export default Cards;