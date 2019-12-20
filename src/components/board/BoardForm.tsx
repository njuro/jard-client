import React, { ReactNode, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { DropdownItemProps, Header, Modal } from "semantic-ui-react";
import {
  getApiRequest,
  postApiRequest,
  putApiRequest
} from "../../helpers/api";
import { objectToDropdownItem } from "../../helpers/forms";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { BoardAttachmentTypeView, BoardType } from "../../types";
import Form, {
  Button,
  Checkbox,
  FormErrors,
  Select,
  TextInput
} from "../form/Form";

interface BoardFormProps {
  trigger: ReactNode;
  value?: BoardType;
}
function BoardForm({ trigger, value: board }: BoardFormProps) {
  const isEdit = !!board;
  const [attachmentTypes, setAttachmentTypes] = useState<DropdownItemProps[]>(
    []
  );
  const [updatedBoard, setUpdatedBoard] = useState<BoardType>();
  const [errors, setErrors] = useState<Map<string, string>>();

  useEffect(() => {
    getApiRequest<BoardAttachmentTypeView[]>(
      BOARDS_URL + "/types"
    ).then(types =>
      setAttachmentTypes(
        types.map(type => objectToDropdownItem(type.name, type.description))
      )
    );
  }, []);

  function handleSubmit(boardForm: BoardType) {
    const response = isEdit
      ? postApiRequest<BoardType>(BOARD_URL(board!) + "/edit", boardForm)
      : putApiRequest<BoardType>(BOARDS_URL, boardForm);
    response
      .then(setUpdatedBoard)
      .catch(err => setErrors(err.response.data.errors));
  }

  if (updatedBoard) {
    return <Redirect to={BOARD_URL(updatedBoard)} />;
  }

  const defaultValues = isEdit
    ? {
        label: board!.label,
        name: board!.name,
        nsfw: board!.nsfw,
        attachmentType: board!.attachmentType,
        threadLimit: board!.threadLimit,
        bumpLimit: board!.bumpLimit
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
            {isEdit ? `Edit board /${board!.label}/` : "Create new board"}
          </Header>
          <TextInput
            name="label"
            label="Label"
            placeholder="Label"
            required={true}
            disabled={isEdit}
          />
          <TextInput
            name="name"
            label="Name"
            placeholder="Name"
            required={true}
          />
          <TextInput
            name="threadLimit"
            label="Thread limit"
            placeholder="Thread limit"
            type="number"
            required={true}
          />
          <TextInput
            name="bumpLimit"
            label="Bump limit"
            placeholder="Bump limit"
            type="number"
            required={true}
          />
          <Select
            name="attachmentType"
            label="Allowed attachment types"
            options={attachmentTypes}
            required={true}
          />
          <Checkbox name="nsfw" label="NSFW" />
          <FormErrors errors={errors} />
          <Button fluid={true}>
            {isEdit ? "Update board" : "Create board"}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BoardForm;
