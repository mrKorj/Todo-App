import React from "react";
import {TodoItem} from "../components/TodoItem";

export const TodoList = ({todos}) => {
    return (
        <div>
            <ul>
                {todos.map(todo => {
                    return <TodoItem todo={todo} key={todo.id}/>
                })}
            </ul>
        </div>
    )
}