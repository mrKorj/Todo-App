import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/useHttp";


export const AuthPage = () => {
    const [form, setForm] = useState({userName: '', password: ''});
    const history = useHistory();
    const {request, error} = useHttp();

    const logInHandler = async () => {
        try {
            const data = await request('/api/auth/login', {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
            });
            const {userName, token} = data;
            localStorage.setItem('userData', JSON.stringify({userName, token}));
            token ? history.push("/") : alert(JSON.stringify(data.message))
        } catch (e) {
            console.log(error)
        }
    };

    const registrationHandler = async () => {
        try {
            const data = await request('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            alert(JSON.stringify(data.message))
        } catch (e) {
            console.log(error)
        }
    };

    const formHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Todo's App</h3>
                <div className="card">
                    <div className="card-content white-text">
                        <span className="card-title black-text">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input className="validate" id="user_name" type="text" name="userName"
                                       onChange={formHandler}/>
                                <label htmlFor="first_name">User Name</label>
                            </div>
                            <div className="input-field">
                                <input className="validate" id="password" type="password" name="password"
                                       onChange={formHandler}/>
                                <label htmlFor="first_name">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn blue"
                                style={{marginRight: 10}}
                                onClick={registrationHandler}>
                            Registration
                        </button>
                        <button className="btn teal black-text"
                                onClick={logInHandler}>
                            LogIn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};