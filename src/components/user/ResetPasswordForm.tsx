import React, { useContext, useState } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import { Redirect, useLocation } from "react-router-dom";
import { ResetPasswordType } from "../../types";
import { apiErrorHandler, postApiRequest } from "../../helpers/api";
import { LOGIN_URL, USERS_URL } from "../../helpers/mappings";
import Form, {
  Button,
  FormErrors,
  PasswordInput,
  TextInput,
} from "../form/Form";
import { AppContext } from "../App";
import { notifySuccess } from "../../helpers/notifications";

function ResetPasswordForm() {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token") ?? "";

  const { inputConstraints } = useContext(AppContext);

  const [errors, setErrors] = useState<object>();
  const [passwordReseted, setPasswordReseted] = useState<boolean>(false);

  function handleSubmit(resetPassword: ResetPasswordType) {
    postApiRequest(`${USERS_URL}/reset-password`, resetPassword)
      .then(() => {
        notifySuccess("Password updated", "Password was successfully updated");
        setPasswordReseted(true);
      })
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  if (passwordReseted) {
    return <Redirect to={LOGIN_URL} />;
  }

  return (
    <Grid>
      <Helmet title="Reset password" />
      <Form
        style={{ minWidth: "60%" }}
        onSubmit={handleSubmit}
        className="six wide column centered"
        error={!!errors}
        defaultValues={{ token }}
      >
        <Segment>
          <Header as="h4" dividing>
            Reset password
          </Header>
          <PasswordInput
            name="password"
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
            name="passwordRepeated"
            label="Repeat new password"
            placeholder="Repeat new password"
          />
          <TextInput name="token" hidden />
          <FormErrors errors={errors} />
          <Button fluid>Send password reset link</Button>
        </Segment>
      </Form>
    </Grid>
  );
}

export default ResetPasswordForm;
