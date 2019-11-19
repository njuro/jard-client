import React, {useContext, useState} from 'react';
import {Form, Grid, Header, Segment} from 'semantic-ui-react';
import {usePostApi} from '../api';
import {Redirect} from 'react-router-dom';
import FormErrors from './FormErrors';
import {AuthContext} from './App';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedUser, logUser, isError] = usePostApi('/login');
    const {setUser} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();

        const loginForm = {username, password, rememberMe};
        logUser(loginForm);
    }

    if (!isError && loggedUser) {
        setUser(loggedUser);
        return <Redirect to='/dashboard'/>;
    }

    return (
        <Grid>
            <Form onSubmit={handleSubmit} className={'six wide column centered'} error={isError}>
                <Segment>
                    <Header as='h4' dividing>Login</Header>
                    <Form.Input label='Username' placeholder='Username' value={username}
                                onChange={e => setUsername(e.target.value)}/>
                    <Form.Input label='Password' placeholder='Password' type='password' value={password}
                                onChange={e => setPassword(e.target.value)}/>
                    <Form.Checkbox label='Remember me' checked={rememberMe}
                                   onChange={() => setRememberMe(!rememberMe)}/>
                    {isError && loggedUser && <FormErrors errors={loggedUser.errors}/>}
                    <Form.Button fluid>Login</Form.Button>
                </Segment>
            </Form>
        </Grid>
    );
}

export default Login;