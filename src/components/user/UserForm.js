import React, { useState } from "react";
import { putApiRequest } from "../../helpers/api";
import { Header, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { USERS_URL } from "../../helpers/mappings";
import Form, { Button, FormErrors, TextInput } from "../form/Form";

function UserForm() {
  const [registeredUser, setRegisteredUser] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  function handleSubmit(registerForm) {
    putApiRequest(USERS_URL, registerForm)
      .then(setRegisteredUser)
      .catch(err => setErrors(err.response.data.errors));
  }

  if (registeredUser) {
    return <Redirect to="/login/" />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className={"six wide column centered"}
      error={errors !== undefined}
    >
      <Segment>
        <Header as="h4" dividing>
          Create new user
        </Header>
        <TextInput name="username" label="Username" placeholder="Username" />
        <TextInput
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
        <TextInput
          name="passwordRepeated"
          label="Repeat Password"
          placeholder="Repeat Password"
          type="password"
        />
        <TextInput
          name="email"
          label="E-mail"
          placeholder="E-mail"
          type="email"
        />
        <FormErrors errors={errors} />
        <Button fluid>Create user</Button>
      </Segment>
    </Form>
  );
}

export default UserForm;
