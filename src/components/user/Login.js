import React, {useContext, useState} from 'react';
import {Form, Grid, Header, Segment} from 'semantic-ui-react';
import {usePostApi} from '../../helpers/api';
import {Redirect} from 'react-router-dom';
import FormErrors from '../utils/FormErrors';
import {AuthContext} from '../App';

function Login() {
    const {user, setUser} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedUser, setLoggedUser] = useState(undefined);
    const [errors, setErrors] = useState(undefined);

    const logUser = usePostApi('/login');

    function handleSubmit(e) {
        e.preventDefault();

        const loginForm = {username, password, rememberMe};
        logUser(loginForm)
            .then(user => setLoggedUser(user))
            .catch(err => setErrors(err.response.data.errors));
    }

    if (user) {
        return <Redirect to='/'/>;
    }

    if (loggedUser) {
        setUser(loggedUser);
        return <Redirect to='/dashboard'/>;
    }

    return (
        <Grid>
            <Form onSubmit={handleSubmit} className={'six wide column centered'} error={errors !== undefined}>
                <Segment>
                    <Header as='h4' dividing>Login</Header>
                    <Form.Input label='Username' placeholder='Username' value={username}
                                onChange={e => setUsername(e.target.value)}/>
                    <Form.Input label='Password' placeholder='Password' type='password' value={password}
                                onChange={e => setPassword(e.target.value)}/>
                    <Form.Checkbox label='Remember me' checked={rememberMe}
                                   onChange={() => setRememberMe(!rememberMe)}/>
                    <FormErrors errors={errors}/>
                    <Form.Button fluid>Login</Form.Button>
                </Segment>
            </Form>
        </Grid>
    );
}

export default Login;