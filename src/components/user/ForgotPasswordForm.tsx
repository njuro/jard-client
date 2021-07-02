import React, { useState } from "react";
import { Grid, Header, Modal, Segment } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Form, { Button, Captcha, FormErrors, TextInput } from "../form/Form";
import { ForgotPasswordType } from "../../types";
import { apiErrorHandler, postApiRequest } from "../../helpers/api";
import { USERS_URL } from "../../helpers/mappings";

function ForgotPasswordForm() {
  const [errors, setErrors] = useState<object>();
  const [linkSent, setLinkSent] = useState<boolean>(false);

  function handleSubmit(forgotPassword: ForgotPasswordType) {
    postApiRequest(`${USERS_URL}/forgot-password`, forgotPassword)
      .then(() => setLinkSent(true))
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  return (
    <Grid>
      <Helmet title="Forgot password" />
      <Form
        style={{ minWidth: "60%" }}
        onSubmit={handleSubmit}
        className="six wide column centered"
        error={!!errors}
      >
        <Segment>
          <Header as="h4" dividing>
            Forgot password
          </Header>
          <TextInput name="username" label="Username" placeholder="Username" />
          <Captcha name="captchaToken" />
          <FormErrors errors={errors} />
          <Button fluid>Send password reset link</Button>
        </Segment>
      </Form>
      <Modal
        closeIcon
        open={linkSent}
        onClose={() => setLinkSent(false)}
        size="small"
      >
        <Modal.Header>Reset link sent</Modal.Header>
        <Modal.Content>
          Password reset link was sent to e-mail address associated with this
          username. It may take a few minutes for the message to arrive. Please
          make sure to check also the Spam / Ads / Networks folders in your
          inbox.
        </Modal.Content>
        <Modal.Actions>
          <Button floated="right" onClick={() => setLinkSent(false)}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
}

export default ForgotPasswordForm;
