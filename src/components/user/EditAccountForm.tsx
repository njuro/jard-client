import React, { useContext, useState } from "react";
import { Header } from "semantic-ui-react";
import { AppContext } from "../App";
import Form, { Button, FormErrors, TextInput } from "../form/Form";
import { apiErrorHandler, patchApiRequest } from "../../helpers/api";
import { USERS_URL } from "../../helpers/mappings";
import { notifySuccess } from "../../helpers/notifications";
import { EditAccountType } from "../../types";

function EditAccountForm() {
  const { user } = useContext(AppContext);

  const [errors, setErrors] = useState<object>();

  function editAccount(accountEdit: EditAccountType) {
    patchApiRequest(`${USERS_URL}/current`, { email: accountEdit.email })
      .then(() =>
        notifySuccess(
          "Account updated",
          "Account data was successfully updated"
        )
      )
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  const defaultValues = {
    username: user.username,
    role: user.role,
    email: user.email,
  };

  return (
    <Form onSubmit={editAccount} defaultValues={defaultValues} error={!!errors}>
      <Header as="h4" dividing>
        Edit account
      </Header>
      <TextInput name="username" label="Username" disabled />
      <TextInput name="role" label="Role" disabled />
      <TextInput
        name="email"
        placeholder="E-mail"
        label="E-mail"
        type="email"
      />
      <FormErrors errors={errors} />
      <Button fluid>Update account</Button>
    </Form>
  );
}

export default EditAccountForm;
