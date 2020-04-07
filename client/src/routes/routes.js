import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import {AuthPage} from "../pages/authPage";
import {MainPage} from "../pages/MainPage";


export const Routes = () => {
    const {token} = JSON.parse(localStorage.getItem('userData')) || false;
    console.log(token)

    return (
        <Switch>
            <Route exact path="/">
                {() => {
                    if (!token) {
                        return <Redirect to="/reg"/>
                    }
                    return <MainPage/>
                }}
            </Route>
            <Route path="/reg" exact>
                <AuthPage/>
            </Route>
        </Switch>
    )
};