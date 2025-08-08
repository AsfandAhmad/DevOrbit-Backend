import React from 'react';
import spinnerGif from './Spinner.gif'; // ✅ Use a different name

const Spinner = () => {
    return (
        <div>
            <img src={spinnerGif} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
        </div>
    );
};

export default Spinner;
