import React, {useContext} from 'react';
import {AuthContext} from '../../App';
import {Grid, Menu} from 'semantic-ui-react';
import {AUTH_URL} from '../../../helpers/mappings';
import {Link, Route, Switch} from 'react-router-dom';
import BoardForm from '../../board/BoardForm';
import Register from '../Register';

function Dashboard() {

    const {user} = useContext(AuthContext);

    return (
        <Grid columns={2}>
            <Grid.Column width={4}>
                <Menu fluid vertical>
                    <Menu.Item><Link to={AUTH_URL}>Dashboard</Link></Menu.Item>
                    <Menu.Item><Link to={`${AUTH_URL}/create-board`}>Create board</Link></Menu.Item>
                    <Menu.Item><Link to={`${AUTH_URL}/create-user`}>Create user</Link></Menu.Item>
                </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
                <Switch>
                    <Route exact path={`${AUTH_URL}/create-board`} component={BoardForm}/>
                    <Route exact path={`${AUTH_URL}/create-user`} component={Register}/>
                    <Route render={() => <div>Hello dashboard</div>}/>
                </Switch>
            </Grid.Column>
        </Grid>
    );
}

export default Dashboard;