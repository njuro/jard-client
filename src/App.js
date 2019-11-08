import React from 'react';

import {useApi} from './api';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Board from './components/Board';

function App() {
    const [boards, fetchBoards] = useApi('boards/', []);


  return (
      <div className={'wrapper'}>
          <Router>
              <nav>
                  <Menu>
                      <Menu.Item header>JBoard</Menu.Item>
                      {boards.map(board => (
                          <Menu.Item key={board.label} name={board.label}><Link
                              to={'/boards/' + board.label}>/{board.label}/
                              - {board.name}</Link></Menu.Item>
                      ))}
                  </Menu>
              </nav>
              <main>
                  <Switch>
                      <Route exact path='/boards/:label' component={Board}/>
                  </Switch>
              </main>
          </Router>
      </div>
  );
}

export default App;
