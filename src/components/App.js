import React, {createContext, useEffect, useState} from 'react';

import {useGetApi} from '../helpers/api';
import {BrowserRouter as Router} from 'react-router-dom';
import TopMenu from './base/TopMenu';
import RouteSwitch from './base/RouteSwitch';

export const AuthContext = createContext({});

function App() {
    const [user, setUser] = useState(undefined);
    const [currentUser] = useGetApi('/users/current');

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <Router>
                <nav>
                    <TopMenu/>
                </nav>
                <main>
                    <RouteSwitch/>
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
