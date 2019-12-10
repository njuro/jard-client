import React, { useContext, useState } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { postApiRequest } from "../../helpers/api";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import { LOGIN_URL } from "../../helpers/mappings";
import Form, { Button, Checkbox, FormErrors, TextInput } from "../form/Form";

function LoginForm() {
  const { user, setUser } = useContext(AuthContext);

  const [loggedUser, setLoggedUser] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  function handleSubmit(loginForm) {
    postApiRequest(LOGIN_URL, loginForm)
      .then(user => setLoggedUser(user))
      .catch(err => setErrors(err.response.data.errors));
  }

  if (user) {
    return <Redirect to="/" />;
  }

  if (loggedUser) {
    setUser(loggedUser);
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid>
      <Form
        onSubmit={handleSubmit}
        className={"six wide column centered"}
        error={errors !== undefined}
      >
        <Segment>
          <Header as="h4" dividing>
            Login
          </Header>
          <TextInput name="username" label="Username" placeholder="Username" />
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Checkbox name="rememberMe" label="Remember me" />
          <FormErrors errors={errors} />
          <Button fluid>Login</Button>
        </Segment>
      </Form>
    </Grid>
  );
}

export default LoginForm;
