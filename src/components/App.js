import React, {createContext, useEffect, useState} from 'react';

import {useGetApi, usePostApi} from '../helpers/api';
import {Button, Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Board from './board/Board';
import Home from './Home';
import ThreadWrapper from './thread/ThreadWrapper';
import Login from './user/Login';
import NotFound from './utils/NotFound';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';

export const AuthContext = createContext({});

function App() {
    const [user, setUser] = useState(undefined);

    const [currentUser] = useGetApi('/users/current');
    const [, logOut] = usePostApi('/logout');
    const [boards] = useGetApi('boards/', []);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    function handleLogout() {
        logOut({});
        setUser(undefined);
    }

    return (
        <div className={'wrapper'}>
            <AuthContext.Provider value={{user, setUser}}>
                <Router>
                    <nav>
                        <Menu>
                            <Menu.Item header><Link to="/">JBoard</Link></Menu.Item>
                            {boards.map(board => (
                                <Menu.Item key={board.label} name={board.label}><Link
                                    to={`/boards/${board.label}`}>/{board.label}/
                                    - {board.name}</Link></Menu.Item>
                            ))}
                            {!user &&
                            <Menu.Item position='right'><Link to="/login"><Button>Login</Button></Link></Menu.Item>}
                            {user &&
                            <Menu.Item position='right'><Button onClick={handleLogout}>Logout</Button></Menu.Item>}
                        </Menu>
                    </nav>
                    <main>
                        <Switch>
                            <Route exact path="/" render={() => <Home boards={boards}/>}/>
                            <Route exact path='/boards/:label' component={Board}/>
                            <Route exact path='/boards/:label/:threadNumber' component={ThreadWrapper}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </main>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
