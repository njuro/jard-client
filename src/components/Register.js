import React, {useState} from 'react';
import {usePostApi} from '../api';
import {Form, Grid, Header, Segment} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import FormErrors from './FormErrors';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeated, setPasswordRepeated] = useState('');
    const [email, setEmail] = useState('');
    const [registeredUser, registerUser, isError] = usePostApi('/users/register');

    function handleSubmit(e) {
        e.preventDefault();

        const registerForm = {username, password, passwordRepeated, email};
        registerUser(registerForm);
    }

    if (!isError && registeredUser) {
        return <Redirect to='/login/'/>;
    }

    return (
        <Grid>
            <Form onSubmit={handleSubmit} className={'six wide column centered'} error={isError}>
                <Segment>
                    <Header as='h4' dividing>Create new user</Header>
                    <Form.Input label='Username' placeholder='Username' value={username}
                                onChange={e => setUsername(e.target.value)}/>
                    <Form.Input label='Password' placeholder='Password' type='password' value={password}
                                onChange={e => setPassword(e.target.value)}/>
                    <Form.Input label='Repeat Password' placeholder='Repeat Password' type='password'
                                value={passwordRepeated}
                                onChange={e => setPasswordRepeated(e.target.value)}/>
                    <Form.Input label='E-mail' placeholder='E-mail' type='email' value={email}
                                onChange={e => setEmail(e.target.value)}/>
                    {isError && registeredUser && <FormErrors errors={registeredUser.errors}/>}
                    <Form.Button fluid>Create user</Form.Button>
                </Segment>
            </Form>
        </Grid>
    );
}

export default Register;