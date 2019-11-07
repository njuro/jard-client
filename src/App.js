import React, {useEffect, useState} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import API from './api';
import {Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Board from './components/Board';

function App() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        async function fetchBoards() {
            const response = await API.get('boards');
            setBoards(response.data);
        }

        fetchBoards();
    }, []);

  return (
      <div className={'wrapper'}>
          <Router>
              <Menu>
                  <Menu.Item header>JBoard</Menu.Item>
                  {boards.map(board => (
                      <Menu.Item key={board.label} name={board.label}><Link to={'/boards/' + board.label}>/{board.label}/
                          - {board.name}</Link></Menu.Item>
                  ))}
              </Menu>
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
