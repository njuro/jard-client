import React, { useContext, useState } from "react";
import { Header } from "semantic-ui-react";
import Form, { Button, FormErrors, PasswordInput } from "../form/Form";
import { AppContext } from "../App";
import { EditPasswordType } from "../../types";
import { apiErrorHandler, patchApiRequest } from "../../helpers/api";
import { USERS_URL } from "../../helpers/mappings";
import { notifySuccess } from "../../helpers/notifications";

function EditPasswordForm() {
  const { inputConstraints } = useContext(AppContext);

  const [errors, setErrors] = useState<object>();
  const [triggerReset, setTriggerReset] = useState<boolean>(false);

  function editPassword(passwordEdit: EditPasswordType) {
    patchApiRequest(`${USERS_URL}/current/password`, passwordEdit)
      .then(() => {
        notifySuccess("Password updated", "Password was successfully updated");
        setTriggerReset(true);
      })
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    newPasswordRepeated: "",
  };

  return (
    <Form
      onSubmit={editPassword}
      error={!!errors}
      defaultValues={defaultValues}
      triggerReset={triggerReset}
      setTriggerReset={setTriggerReset}
    >
      <Header as="h4" dividing>
        Edit password
      </Header>
      <PasswordInput
        name="currentPassword"
        label="Current password"
        placeholder="Current password"
      />
      <PasswordInput
        name="newPassword"
        label="New password"
        placeholder="New password"
        rules={{
          minLength: {
            value: inputConstraints.MIN_PASSWORD_LENGTH,
            message: inputConstraints.MIN_PASSWORD_LENGTH,
          },
        }}
      />
      <PasswordInput
        name="newPasswordRepeated"
        label="Repeat new password"
        placeholder="Repeat new password"
      />
      <FormErrors errors={errors} />
      <Button fluid>Update password</Button>
    </Form>
  );
}

export default EditPasswordForm;
