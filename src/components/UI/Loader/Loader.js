import React from 'react';
import classes from './Loader.module.css'

const Loader = ({title}) => {
    return (
        <span className={classes.loader}>{title}</span>
    );
};

export default Loader;