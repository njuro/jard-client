import React, { ReactNode, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import {
  apiErrorHandler,
  postApiRequest,
  putApiRequest,
} from "../../helpers/api";
import { LOGIN_URL, USER_URL, USERS_URL } from "../../helpers/mappings";
import { UserRole, UserType } from "../../types";
import Form, {
  Button,
  FormErrors,
  PasswordInput,
  Select,
  TextInput,
} from "../form/Form";
import { objectToDropdownItem } from "../../helpers/utils";
import { AppContext } from "../App";

interface UserFormProps {
  trigger: ReactNode;
  value?: UserType;
}
function UserForm({ trigger, value: existingUser }: UserFormProps) {
  const { inputConstraints } = useContext(AppContext);

  const [updatedUser, setUpdatedUser] = useState<UserType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(userForm: UserType) {
    const response = existingUser
      ? putApiRequest<UserType>(`${USER_URL(existingUser)}`, userForm)
      : postApiRequest<UserType>(USERS_URL, userForm);
    response
      .then(setUpdatedUser)
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  if (updatedUser) {
    return <Redirect to={LOGIN_URL} />;
  }

  const defaultValues = existingUser
    ? {
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
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
            {existingUser
              ? `Edit user ${existingUser.username}`
              : "Create new user"}
          </Header>
          <TextInput
            name="username"
            label="Username"
            placeholder="Username"
            disabled={!!existingUser}
            rules={{
              minLength: {
                value: inputConstraints.MIN_USERNAME_LENGTH,
                message: inputConstraints.MIN_USERNAME_LENGTH,
              },
              maxLength: {
                value: inputConstraints.MAX_USERNAME_LENGTH,
                message: inputConstraints.MAX_USERNAME_LENGTH,
              },
            }}
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Password"
            rules={{
              minLength: {
                value: inputConstraints.MIN_PASSWORD_LENGTH,
                message: inputConstraints.MIN_PASSWORD_LENGTH,
              },
            }}
          />
          <PasswordInput
            name="passwordRepeated"
            label="Repeat Password"
            placeholder="Repeat Password"
          />
          <TextInput
            name="email"
            label="E-mail"
            placeholder="E-mail"
            type="email"
          />
          <Select
            name="role"
            options={Object.keys(UserRole).map((role) =>
              objectToDropdownItem(role, role)
            )}
            label="Role"
            placeholder="Select role"
            required
          />
          <FormErrors errors={errors} />
          <Button fluid>{existingUser ? "Edit user" : "Create user"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default UserForm;
