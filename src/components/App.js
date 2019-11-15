import React from 'react';

import {useGetApi} from '../api';
import {Button, Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Board from './Board';
import Home from './Home';
import ThreadWrapper from './ThreadWrapper';
import Login from './Login';
import NotFound from './NotFound';
import Register from './Register';

function App() {
    const [boards] = useGetApi('boards/', []);


  return (
      <div className={'wrapper'}>
          <Router>
              <nav>
                  <Menu>
                      <Menu.Item header><Link to="/">JBoard</Link></Menu.Item>
                      {boards.map(board => (
                          <Menu.Item key={board.label} name={board.label}><Link
                              to={`/boards/${board.label}`}>/{board.label}/
                              - {board.name}</Link></Menu.Item>
                      ))}
                      <Menu.Item position='right'><Link to="/login"><Button>Login</Button></Link></Menu.Item>
                  </Menu>
              </nav>
              <main>
                  <Switch>
                      <Route exact path="/" render={() => <Home boards={boards}/>}/>
                      <Route exact path='/boards/:label' component={Board}/>
                      <Route exact path='/boards/:label/:threadNumber' component={ThreadWrapper}/>
                      <Route exact path='/login' component={Login}/>
                      <Route exact path='/register' component={Register}/>
                      <Route component={NotFound}/>
                  </Switch>
              </main>
          </Router>
      </div>
  );
}

export default App;
