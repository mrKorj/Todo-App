import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../context/Context'

export const TodoItem = ({todo}) => {
    const {checkHandler, deleteHandler} = useContext(Context);
    const {id, title, date, isCompleted} = todo;
    const [styles, setStyles] = useState({
        textDecoration: 'none'
    });

    useEffect(() => {
        if (isCompleted) {
            setStyles({textDecoration: 'line-through'})
        } else {
            setStyles({textDecoration: 'none'})
        }
    }, [isCompleted]);

    return (
        <li className="list-item">
            <label>
                <input type="checkbox"
                       checked={isCompleted}
                       onChange={() => checkHandler(id)}
                />
                <span/>
            </label>
            <span style={styles}>
                <span>{title}</span>
                &nbsp;
                <span>({date})</span>
            </span>
            <button className="btn btn-small red" onClick={() => deleteHandler(id)}>&times;</button>
        </li>
    )
}