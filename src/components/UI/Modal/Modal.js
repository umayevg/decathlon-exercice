import React from 'react';
import classes from "./Modal.module.css";
import Rating from "../Rating/Rating";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';


const Modal = ({visible, setVisible}) => {
    const game = visible.game
    // const screenshots = visible.screenshots
    const screenshots = game.short_screenshots?.slice(1) || []
    const rootClasses = [classes.modal]
    if (visible.visible) {
        rootClasses.push(classes.active)
    }

    const closeModal = () => {
        setVisible({visible: false, game: null})
    }

    const preventPropagation = (e) => {
        e.stopPropagation()
    }


    return (
        <div className={rootClasses.join(' ')} onClick={closeModal}>
            <div className={classes.modalContent} onClick={preventPropagation}>
                <img src={game.background_image} alt={game.name}/>
                <h2>{game.name}</h2>
                <div className={classes.platforms}>
                    {game.platforms?.map(platform => (
                        <span className={classes.platform} key={platform.platform.name}>{platform.platform.name}</span>

                    ))}
                </div>
                <div className={classes.ratings}>
                    {game.ratings?.sort((a, b) => b.id - a.id).map(rating =>
                        <Rating key={rating.title} rating={rating}/>
                    )}
                </div>
                <div className={classes.screenshots}>

                    <Carousel>
                        {screenshots.map(image =>
                            <div key={image.id}>
                                <img src={image.image} alt="Game screenshot" decoding={"async"}/>
                            </div>
                        )}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Modal;