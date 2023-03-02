import React from 'react';
import classes from "./Modal.module.css";

const Modal = ({children, visible, setVisible}) => {
    return (
        <div className={[classes.modal, classes.active].join(' ')}>
            <div className={classes.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;