import React, {useState} from 'react';
import {postApiRequest} from '../../helpers/api';
import {Form, Grid, Header, Segment} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import FormErrors from '../utils/FormErrors';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeated, setPasswordRepeated] = useState('');
    const [email, setEmail] = useState('');
    const [registeredUser, setRegisteredUser] = useState(undefined);
    const [errors, setErrors] = useState(undefined);

    function handleSubmit(e) {
        e.preventDefault();

        const registerForm = {username, password, passwordRepeated, email};
        postApiRequest('/users/register', registerForm)
            .then(user => setRegisteredUser(user))
            .catch(err => setErrors(err.response.data.errors));
    }

    if (registeredUser) {
        return <Redirect to='/login/'/>;
    }

    return (
        <Grid>
            <Form onSubmit={handleSubmit} className={'six wide column centered'} error={errors !== undefined}>
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
                    <FormErrors errors={errors}/>
                    <Form.Button fluid>Create user</Form.Button>
                </Segment>
            </Form>
        </Grid>
    );
}

export default Register;