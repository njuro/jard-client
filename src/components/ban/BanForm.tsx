import React, { ReactNode, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import { postApiRequest, putApiRequest } from "../../helpers/api";
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
function BanForm({ trigger, ip, value: ban }: BanFormProps) {
  const isEdit = !!ban;

  const [updatedBan, setUpdatedBan] = useState<BanType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(banForm: BanType) {
    const response = isEdit
      ? postApiRequest<BanType>(`${BAN_URL(ban!)}/edit`, banForm)
      : putApiRequest<BanType>(BANS_URL, banForm);
    response
      .then(setUpdatedBan)
      .catch((err) => setErrors(err.response.data.errors));
  }

  if (updatedBan) {
    return <Redirect to={`${DASHBOARD_URL}/manage-bans`} />;
  }

  const defaultValues = isEdit
    ? {
        ip: ban!.ip,
        status: ban!.status,
        reason: ban!.reason,
        end: new Date(ban!.end),
        unbannedBy: ban!.unbannedBy?.username,
        unbanReason: ban!.unbanReason,
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
            {isEdit ? "Edit ban" : "Create new ban"}
          </Header>
          <TextInput
            name="ip"
            value={ip}
            label="IP"
            placeholder="IP"
            required
            disabled={isEdit}
          />
          <TextInput
            name="reason"
            label="Reason"
            placeholder="Reason"
            required
          />
          <DatePicker name="end" datePickerOnly label="End" />
          <Checkbox name="warning" label="Is warning?" />
          <FormErrors errors={errors} />
          <Button fluid>{isEdit ? "Update ban" : "Create ban"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BanForm;
