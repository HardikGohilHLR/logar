// Alert
import React from 'react';

const Alert = ({ alert, setAlert }) => {
    return (
        <div className={`message is-${alert?.type}`}>
            <p>{ alert?.message }</p>
            <button type="button" className="delete" onClick={() => setAlert(null)}>&#10005;	</button>
        </div>
    )
}

export default Alert;