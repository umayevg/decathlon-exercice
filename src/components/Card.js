import React from 'react';

const Card = ({game,fetchGame}) => {
    return (
        <div className="card" key={game.name} onClick={() => fetchGame(game.id)}>
            <img src={game.background_image} alt="" height="200" loading="lazy" decoding={"async"}
                 style={{contentVisibility: 'auto'}}/>
            <div className="card-content">
                <h3>{game.name}</h3>
                <div className="platforms">
                    {game.platforms.map(platform => (
                        <span className="platform" key={platform.platform.name}>{platform.platform.name}</span>

                    ))}
                </div>
                <div className="tags">
                    {game.tags.slice(0, 2).map(tag => (
                        <span key={tag.name}>{tag.name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;