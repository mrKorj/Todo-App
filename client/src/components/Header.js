import React from 'react';
import {useHistory} from 'react-router-dom'

export const Header = ({userName}) => {
    const history = useHistory();

    const logOutHandler = () => {
        localStorage.removeItem('userData');
        history.push('/reg')
    };

    return (
        <header>
            <h4>Main Page</h4>
            <span>
                    Welcome, <strong>{userName} </strong>
                    <button className="btn btn-small grey" onClick={logOutHandler}>LogOut</button>
                </span>
        </header>
    )
}