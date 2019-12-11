import React, { useEffect, useState } from "react";
import { Header, Modal } from "semantic-ui-react";
import { getApiRequest, putApiRequest } from "../../helpers/api";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { Redirect } from "react-router-dom";
import { objectToDropdownItems } from "../../helpers/forms";
import Form, {
  Button,
  Checkbox,
  FormErrors,
  Select,
  TextInput
} from "../form/Form";

function BoardForm({ trigger, value: board }) {
  const isEdit = !!board;
  const [attachmentTypes, setAttachmentTypes] = useState([]);
  const [createdBoard, setCreatedBoard] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  useEffect(() => {
    getApiRequest(BOARDS_URL + "/types").then(types =>
      setAttachmentTypes(
        types.map(type => objectToDropdownItems(type.name, type.description))
      )
    );
  }, []);

  function handleSubmit(boardForm) {
    const url = isEdit ? BOARD_URL(board) + "/edit" : BOARDS_URL;
    putApiRequest(url, boardForm)
      .then(setCreatedBoard)
      .catch(err => setErrors(err.response.data.errors));
  }

  if (createdBoard) {
    return <Redirect to={BOARD_URL(createdBoard)} />;
  }

  const defaultValues = isEdit
    ? {
        label: board.label,
        name: board.name,
        nsfw: board.nsfw,
        attachmentType: board.attachmentType
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
            {isEdit ? `Edit board /${board.label}/` : "Create new board"}
          </Header>
          <TextInput
            name="label"
            label="Label"
            placeholder="Label"
            required
            disabled={isEdit}
          />
          <TextInput name="name" label="Name" placeholder="Name" required />
          <Select
            name="attachmentType"
            label="Allowed attachment types"
            options={attachmentTypes}
            required
          />
          <Checkbox name="nsfw" label="NSFW" />
          <FormErrors errors={errors} />
          <Button fluid>{isEdit ? "Update board" : "Create board"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BoardForm;
