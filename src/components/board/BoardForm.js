import React, { useEffect, useState } from "react";
import { Header, Modal } from "semantic-ui-react";
import {
  getApiRequest,
  postApiRequest,
  putApiRequest
} from "../../helpers/api";
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
  const [updatedBoard, setUpdatedBoard] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  useEffect(() => {
    getApiRequest(BOARDS_URL + "/types").then(types =>
      setAttachmentTypes(
        types.map(type => objectToDropdownItems(type.name, type.description))
      )
    );
  }, []);

  function handleSubmit(boardForm) {
    const response = isEdit
      ? postApiRequest(BOARD_URL(board) + "/edit", boardForm)
      : putApiRequest(BOARDS_URL, boardForm);
    response
      .then(setUpdatedBoard)
      .catch(err => setErrors(err.response.data.errors));
  }

  if (updatedBoard) {
    return <Redirect to={BOARD_URL(updatedBoard)} />;
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
