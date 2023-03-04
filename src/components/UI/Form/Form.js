import React from 'react';

const Form = ({processChange}) => {
    return (
        <div className="form">
            <form>
                <div className="row">
                    <input onChange={processChange} type="text" placeholder="Game name..."/>
                </div>
            </form>
        </div>
    );
};

export default Form;