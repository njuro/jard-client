import React, { useContext, useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import { DashboardContext } from "../dashboard/Dashboard";
import {
  DASHBOARD_MANAGE_ACCOUNT_URL,
  USERS_URL,
} from "../../helpers/mappings";
import { apiErrorHandler, patchApiRequest } from "../../helpers/api";
import Form, { Button, FormErrors, PasswordInput } from "../form/Form";
import { ChangePasswordType } from "../../types";
import { AppContext } from "../App";
import { notifySuccess } from "../../helpers/notifications";

function AccountAdmin() {
  const { inputConstraints } = useContext(AppContext);
  const { setActiveDashboardPath } = useContext(DashboardContext);

  const [errors, setErrors] = useState<object>();
  const [triggerReset, setTriggerReset] = useState<boolean>(false);

  useEffect(() => {
    setActiveDashboardPath(DASHBOARD_MANAGE_ACCOUNT_URL);
  }, [setActiveDashboardPath]);

  function changePassword(passwordChange: ChangePasswordType) {
    patchApiRequest(`${USERS_URL}/current/password`, passwordChange)
      .then(() => {
        notifySuccess("Password changed", "Password was sucessfully updated");
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
      onSubmit={changePassword}
      error={!!errors}
      defaultValues={defaultValues}
      triggerReset={triggerReset}
      setTriggerReset={setTriggerReset}
    >
      <Header as="h4" dividing>
        Change password
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
      <Button fluid>Change password</Button>
    </Form>
  );
}

export default AccountAdmin;
