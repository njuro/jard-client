import React, {useState} from 'react';
import {Form, Grid, Header, List, Message, Segment} from 'semantic-ui-react';
import {usePostApi} from '../api';
import {Redirect} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loggedUser, logUser, isError] = usePostApi('/login');

    function handleSubmit(e) {
        e.preventDefault();

        const loginForm = {username, password, rememberMe};
        logUser(loginForm);
    }

    if (!isError && loggedUser) {
        return <Redirect to='/auth'/>;
    }

    return (
        <Grid>
            <Form onSubmit={handleSubmit} className={'six wide column centered'}>
                <Segment>
                    <Header as='h4' dividing>Login</Header>
                    <Form.Input label='Username' placeholder='Username' value={username}
                                onChange={e => setUsername(e.target.value)}/>
                    <Form.Input label='Password' placeholder='Password' value={password}
                                onChange={e => setPassword(e.target.value)}/>
                    <Form.Checkbox label='Remember me' checked={rememberMe}
                                   onChange={() => setRememberMe(!rememberMe)}/>
                    {isError && loggedUser && <Message error content={<List items={loggedUser.errors} bulleted/>}/>}
                    <Form.Button fluid>Login</Form.Button>
                </Segment>
            </Form>
        </Grid>
    );
}

export default Login;