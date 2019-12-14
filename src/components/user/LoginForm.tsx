import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Header, Segment } from "semantic-ui-react";
import { postApiRequest } from "../../helpers/api";
import { LOGIN_URL } from "../../helpers/mappings";
import { UserType } from "../../types";
import { AuthContext } from "../App";
import Form, { Button, Checkbox, FormErrors, TextInput } from "../form/Form";

interface LoginFormObject {
  username: string;
  password: string;
  rememberMe: boolean;
}
function LoginForm() {
  const { user, setUser } = useContext(AuthContext);

  const [loggedUser, setLoggedUser] = useState<UserType>();
  const [errors, setErrors] = useState<string[]>();

  function handleSubmit(loginForm: LoginFormObject) {
    postApiRequest<UserType>(LOGIN_URL, loginForm)
      .then(setLoggedUser)
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
          <Header as="h4" dividing={true}>
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
          <Button fluid={true}>Login</Button>
        </Segment>
      </Form>
    </Grid>
  );
}

export default LoginForm;
