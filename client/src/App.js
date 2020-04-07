import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import 'materialize-css'

import {Routes} from './routes/routes'


function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes/>
            </div>
        </BrowserRouter>
    );
}

export default App;
