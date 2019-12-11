import React, { useState } from "react";
import { postApiRequest, putApiRequest } from "../../helpers/api";
import { Header, Modal } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { USER_URL, USERS_URL } from "../../helpers/mappings";
import Form, { Button, FormErrors, TextInput } from "../form/Form";

function UserForm({ trigger, value: user }) {
  const isEdit = !!user;

  const [updatedUser, setUpdatedUser] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  function handleSubmit(userForm) {
    const response = isEdit
      ? postApiRequest(USER_URL(user) + "/edit", userForm)
      : putApiRequest(USERS_URL, userForm);
    response
      .then(setUpdatedUser)
      .catch(err => setErrors(err.response.data.errors));
  }

  if (updatedUser) {
    return <Redirect to="/login/" />;
  }

  const defaultValues = isEdit
    ? {
        username: user.username,
        email: user.email
      }
    : {};

  return (
    <Modal style={{ paddingBottom: "10px" }} trigger={trigger}>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          error={!!errors}
          defaultValues={defaultValues}
        >
          <Header as="h4" dividing>
            {isEdit ? `Edit user ${user.username}` : "Create new user"}
          </Header>
          <TextInput
            name="username"
            label="Username"
            placeholder="Username"
            disabled={isEdit}
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            disabled={isEdit}
          />
          <TextInput
            name="passwordRepeated"
            label="Repeat Password"
            placeholder="Repeat Password"
            type="password"
            disabled={isEdit}
          />
          <TextInput
            name="email"
            label="E-mail"
            placeholder="E-mail"
            type="email"
          />
          <FormErrors errors={errors} />
          <Button fluid>{isEdit ? "Edit user" : "Create user"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default UserForm;
