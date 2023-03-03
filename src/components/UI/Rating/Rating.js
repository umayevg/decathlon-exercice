import React from 'react';
import classes from './Rating.module.css'

const Rating = ({rating}) => {

    let starsString = ''

    if (rating.title === 'exceptional') {
        starsString = '&#11088;&#11088;&#11088;&#11088;'
    }
    if (rating.title === 'recommended') {
        starsString = '&#11088;&#11088;&#11088;'
    }

    if (rating.title === 'meh') {
        starsString = '&#11088;&#11088;'
    }

    if (rating.title === 'skip') {
        starsString = '&#11088;'
    }

    return (
        <div className={classes.rating}>
            <div dangerouslySetInnerHTML={{__html: starsString}}/>
            <div className={classes.fill}>
                <div className={classes.bg} style={{width: rating.percent + '%'}}></div>
            </div>
            <div>{Math.round(rating.percent)}%</div>
        </div>
    )

};

export default Rating;