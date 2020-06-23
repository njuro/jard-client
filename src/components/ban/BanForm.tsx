import React, { ReactNode, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Header, Modal } from "semantic-ui-react";
import { postApiRequest, putApiRequest } from "../../helpers/api";
import { BANS_URL } from "../../helpers/mappings";
import { BanType } from "../../types";
import Form, {
  Button,
  Checkbox,
  DatePicker,
  FormErrors,
  TextInput,
} from "../form/Form";
import SemanticDatepicker from "react-semantic-ui-datepickers";

interface BanFormProps {
  trigger: ReactNode;
  value?: BanType;
}
function BanForm({ trigger, value: ban }: BanFormProps) {
  const isEdit = !!ban;

  const [end, setEnd] = useState<Date | Date[] | null>(); // TODO handle with RHF
  const [updatedBan, setUpdatedBan] = useState<BanType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(banForm: BanType) {
    banForm.end = (end as unknown) as string;
    const response = isEdit
      ? postApiRequest<BanType>(BANS_URL + "/edit", banForm) // TODO implement edit endpoint
      : putApiRequest<BanType>(BANS_URL, banForm);
    response
      .then(setUpdatedBan)
      .catch((err) => setErrors(err.response.data.errors));
  }

  if (updatedBan) {
    return <Redirect to={"/"} />; // TODO redirect to manage bans
  }

  const defaultValues = isEdit
    ? {
        ip: ban!.ip,
        status: ban!.status,
        reason: ban!.reason,
        bannedBy: ban!.bannedBy.username,
        start: ban!.start,
        end: ban!.end,
        unbannedBy: ban!.unbannedBy?.username,
        unbanReason: ban!.unbanReason,
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
          <Header as="h4" dividing={true}>
            {isEdit ? "Edit ban" : "Create new ban"}
          </Header>
          <TextInput
            name="ip"
            label="IP"
            placeholder="IP"
            required={true}
            disabled={isEdit}
          />
          <TextInput
            name="reason"
            label="Reason"
            placeholder="Reason"
            required={true}
          />
          <SemanticDatepicker
            onChange={(_, data) => setEnd(data.value)}
            datePickerOnly={true}
            label={"End"}
          />
          <Checkbox name="warning" label="Is warning?" />
          <FormErrors errors={errors} />
          <Button fluid={true}>{isEdit ? "Update ban" : "Create ban"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BanForm;
