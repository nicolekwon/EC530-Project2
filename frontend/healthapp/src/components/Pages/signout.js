import React from 'react';

const Signout = () => {
    window.name = null; 
    return (
        <div className='form-content-right'>
            <h1 className='form-success'>You have signed out!</h1>
        </div>
    );
};

export default Signout;