import React, { ReactNode, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import { BanType, UnbanFormType } from "../../types";
import { apiErrorHandler, putApiRequest } from "../../helpers/api";
import { BAN_URL, DASHBOARD_URL } from "../../helpers/mappings";
import Form, { Button, FormErrors, TextInput } from "../form/Form";

interface UnbanFormProps {
  value: BanType;
  trigger: ReactNode;
}
function UnbanForm({ value: ban, trigger }: UnbanFormProps) {
  const [updatedBan, setUpdatedBan] = useState<BanType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(unbanForm: UnbanFormType) {
    putApiRequest<BanType>(`${BAN_URL(ban)}/unban`, unbanForm)
      .then(setUpdatedBan)
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  if (updatedBan) {
    return <Redirect to={`${DASHBOARD_URL}/manage-bans`} />;
  }

  return (
    <Modal style={{ paddingBottom: "10px" }} trigger={trigger}>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          error={!!errors}
          defaultValues={{ ip: ban.ip }}
        >
          <Header as="h4" dividing>
            Unban
          </Header>
          <TextInput name="ip" label="IP" placeholder="IP" required disabled />
          <TextInput
            name="reason"
            label="Reason"
            placeholder="Reason"
            required
          />
          <FormErrors errors={errors} />
          <Button fluid>Unban</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default UnbanForm;
