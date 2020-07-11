import React, { ReactNode, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import { postApiRequest, putApiRequest } from "../../helpers/api";
import { USER_URL, USERS_URL } from "../../helpers/mappings";
import { UserRole, UserType } from "../../types";
import Form, { Button, FormErrors, Select, TextInput } from "../form/Form";
import { objectToDropdownItem } from "../../helpers/utils";

interface UserFormProps {
  trigger: ReactNode;
  value?: UserType;
}
function UserForm({ trigger, value: user }: UserFormProps) {
  const isEdit = !!user;

  const [updatedUser, setUpdatedUser] = useState<UserType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(userForm: UserType) {
    const response = isEdit
      ? postApiRequest<UserType>(`${USER_URL(user!)}/edit`, userForm)
      : putApiRequest<UserType>(USERS_URL, userForm);
    response
      .then(setUpdatedUser)
      .catch((err) => setErrors(err.response.data.errors));
  }

  if (updatedUser) {
    return <Redirect to="/login/" />;
  }

  const defaultValues = isEdit
    ? {
        username: user?.username,
        email: user?.email,
        role: user?.role,
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
            {isEdit ? `Edit user ${user!.username}` : "Create new user"}
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
          <Button fluid>{isEdit ? "Edit user" : "Create user"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default UserForm;
