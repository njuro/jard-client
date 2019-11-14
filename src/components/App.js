import React from 'react';

import {useGetApi} from '../api';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Board from './Board';
import Home from './Home';
import ThreadWrapper from './ThreadWrapper';

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
                              to={'/boards/' + board.label}>/{board.label}/
                              - {board.name}</Link></Menu.Item>
                      ))}
                  </Menu>
              </nav>
              <main>
                  <Switch>
                      <Route exact path="/" render={() => <Home boards={boards}/>}/>
                      <Route exact path='/boards/:label' component={Board}/>
                      <Route exact path='/boards/:label/:threadNumber' component={ThreadWrapper}/>
                  </Switch>
              </main>
          </Router>
      </div>
  );
}

export default App;
