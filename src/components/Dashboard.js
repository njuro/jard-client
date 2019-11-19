import React, {useContext} from 'react';
import {AuthContext} from './App';

function Dashboard(props) {

    const {user} = useContext(AuthContext);

    return (
        <div>Hello {user.username}</div>
    );
}

export default Dashboard;