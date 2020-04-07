import React, {useEffect} from "react";
import {useState} from "react";
import {AddTodo} from "../components/AddTodo";
import {Header} from "../components/Header";
import {TodoList} from "../components/TodoList";
import {Context} from '../context/Context'
import {useHttp} from "../hooks/useHttp";


export const MainPage = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({});

    const {userName, token} = JSON.parse(localStorage.getItem('userData')) || {};
    const {request, error} = useHttp();


    useEffect(() => {
        async function fetchedData() {
            try {
                const data = await request('api/todos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTodos(data)
            } catch (e) {
                alert(error)
            }
        }

        fetchedData()
        console.log('effect')
    }, [newTodo]);

    //----------------------------------------
    const deleteHandler = async (id) => {
        try {
            await request('/api/todos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({userName, todoId: id})
            })
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (e) {
            console.log(error)
        }
    }

    const checkHandler = async (id) => {
        let completed = null
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.isCompleted = !todo.isCompleted
                    completed = todo.isCompleted
                }
                return todo
            })
        );

        try {
            await request('/api/todos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({todoId: id, userName, isCompleted: completed})
            })

        } catch (e) {
            console.log(error)
        }
    };
    const addTodo = (value) => {
        setNewTodo(value)
    }

    return (
        <Context.Provider value={{
            checkHandler, deleteHandler
        }}>
            <div>
                <Header userName={userName}/>
                <hr style={{border: '1px solid #26a69a'}}/>
                <AddTodo onCreate={addTodo}/>
                {todos.length
                    ? <TodoList todos={todos}/>
                    : <h5 style={{textAlign: 'center'}}>No Todos</h5>
                }
            </div>
        </Context.Provider>
    )
}