import React from 'react';
import Home from './Home';
import Board from '../board/Board';
import ThreadWrapper from '../thread/ThreadWrapper';
import Login from '../user/Login';
import Register from '../user/Register';
import ProtectedRoute from '../utils/ProtectedRoute';
import Dashboard from '../user/Dashboard';
import NotFound from '../utils/NotFound';
import {Route, Switch} from 'react-router-dom';

function RouteSwitch() {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path='/boards/:label' component={Board}/>
            <Route exact path='/boards/:label/:threadNumber' component={ThreadWrapper}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
            <Route component={NotFound}/>
        </Switch>
    );
}

export default RouteSwitch;