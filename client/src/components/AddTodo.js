import React, {useState} from 'react';
import {useHttp} from "../hooks/useHttp";

export const AddTodo = ({onCreate}) => {
    const [newTodo, setNewTodo] = useState('');
    const {userName, token} = JSON.parse(localStorage.getItem('userData')) || {}
    const {request, error} = useHttp();

    const onAddHandler = async (event) => {
        event.preventDefault();
        try {
            await request('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({userName, title: newTodo})
            })
        } catch (e) {
            alert(error)
        }
        setNewTodo('')
        onCreate(newTodo)
    };

    return (
        <div>
            <form onSubmit={onAddHandler}>
                <div className="input-field form">
                    <input id="add_todo" type="text"
                           className="validate"
                           value={newTodo}
                           onChange={event => setNewTodo(event.target.value)}/>
                    <label htmlFor="add_todo">Add ToDo</label>
                    <button className="waves-effect waves-light btn">Add</button>
                </div>
            </form>
        </div>
    )
}