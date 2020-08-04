import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Header, Segment } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import { apiErrorHandler, postApiRequest } from "../../helpers/api";
import { DASHBOARD_URL, HOME_URL, LOGIN_URL } from "../../helpers/mappings";
import { UserType } from "../../types";
import { AppContext } from "../App";
import Form, { Button, Checkbox, FormErrors, TextInput } from "../form/Form";

interface LoginFormObject {
  username: string;
  password: string;
  rememberMe: boolean;
}
function LoginForm() {
  const { user, setUser, setActiveMenuPath } = useContext(AppContext);

  const [loggedUser, setLoggedUser] = useState<UserType>();
  const [errors, setErrors] = useState<object>();

  useEffect(() => setActiveMenuPath(LOGIN_URL), [setActiveMenuPath]);

  function handleSubmit(loginForm: LoginFormObject) {
    postApiRequest<UserType>(LOGIN_URL, loginForm)
      .then(setLoggedUser)
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  if (user) {
    return <Redirect to={HOME_URL} />;
  }

  if (loggedUser) {
    setUser(loggedUser);
    return <Redirect to={DASHBOARD_URL} />;
  }

  return (
    <Grid>
      <Helmet title="Login" />
      <Form
        style={{ minWidth: "60%" }}
        onSubmit={handleSubmit}
        className="six wide column centered"
        error={!!errors}
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
