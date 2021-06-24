import React, { ReactNode, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import {
  apiErrorHandler,
  postApiRequest,
  putApiRequest,
} from "../../helpers/api";
import { BAN_URL, BANS_URL, DASHBOARD_URL } from "../../helpers/mappings";
import { BanType } from "../../types";
import Form, {
  Button,
  Checkbox,
  DatePicker,
  FormErrors,
  TextInput,
} from "../form/Form";

interface BanFormProps {
  trigger: ReactNode;
  ip?: string;
  value?: BanType;
}
function BanForm({ trigger, ip, value: existingBan }: BanFormProps) {
  const [updatedBan, setUpdatedBan] = useState<BanType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(banForm: BanType) {
    const response = existingBan
      ? putApiRequest<BanType>(`${BAN_URL(existingBan)}`, banForm)
      : postApiRequest<BanType>(BANS_URL, banForm);
    response
      .then(setUpdatedBan)
      .catch((err) => setErrors(err.response.data.errors))
      .catch(apiErrorHandler);
  }

  if (updatedBan) {
    return <Redirect to={`${DASHBOARD_URL}/manage-bans`} />;
  }

  const defaultValues = existingBan
    ? {
        ip: existingBan.ip,
        status: existingBan.status,
        reason: existingBan.reason,
        validTo: existingBan.validTo
          ? new Date(existingBan.validTo)
          : undefined,
        unbannedBy: existingBan.unbannedBy?.username,
        unbanReason: existingBan.unbanReason,
      }
    : {
        ip,
      };

  return (
    <Modal style={{ paddingBottom: "10px" }} trigger={trigger}>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          error={!!errors}
          defaultValues={defaultValues}
        >
          <Header as="h4" dividing>
            {existingBan ? "Edit ban" : "Create new ban"}
          </Header>
          <TextInput
            name="ip"
            value={ip}
            label="IP"
            placeholder="IP"
            required
            disabled={!!existingBan}
          />
          <TextInput
            name="reason"
            label="Reason"
            placeholder="Reason"
            required
          />
          <DatePicker name="validTo" datePickerOnly label="Valid to" />
          <Checkbox name="warning" label="Is warning?" />
          <FormErrors errors={errors} />
          <Button fluid>{existingBan ? "Update ban" : "Create ban"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BanForm;
