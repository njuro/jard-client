import React, { ReactNode, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { DropdownItemProps, Header, Modal } from "semantic-ui-react";
import {
  getApiRequest,
  postApiRequest,
  putApiRequest,
} from "../../helpers/api";
import { capitalize, objectToDropdownItem } from "../../helpers/utils";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { AttachmentCategoryType, BoardType } from "../../types";
import Form, {
  Button,
  Checkbox,
  FormErrors,
  Select,
  TextInput,
} from "../form/Form";

interface BoardFormProps {
  trigger: ReactNode;
  value?: BoardType;
}
function BoardForm({ trigger, value: existingBoard }: BoardFormProps) {
  const [attachmentCategories, setAttachmentCategories] = useState<
    DropdownItemProps[]
  >([]);
  const [updatedBoard, setUpdatedBoard] = useState<BoardType>();
  const [errors, setErrors] = useState<object>();

  useEffect(() => {
    getApiRequest<AttachmentCategoryType[]>(
      `${BOARDS_URL}/attachment-categories`
    ).then((categories) =>
      setAttachmentCategories(
        categories.map((category) =>
          objectToDropdownItem(
            category.name,
            capitalize(category.name),
            category.extensions.join(", ")
          )
        )
      )
    );
  }, []);

  function handleSubmit(boardForm: BoardType) {
    const response = existingBoard
      ? postApiRequest<BoardType>(`${BOARD_URL(existingBoard)}/edit`, boardForm)
      : putApiRequest<BoardType>(BOARDS_URL, boardForm);
    response
      .then(setUpdatedBoard)
      .catch((err) => setErrors(err.response.data.errors));
  }

  if (updatedBoard) {
    return <Redirect to={`${BOARD_URL(updatedBoard)}/`} />;
  }

  const defaultValues = existingBoard
    ? {
        label: existingBoard.label,
        name: existingBoard.name,
        boardSettingsForm: {
          attachmentCategories: existingBoard.settings.attachmentCategories.map(
            (category) => category.name
          ),
          nsfw: existingBoard.settings.nsfw,
          threadLimit: existingBoard.settings.threadLimit,
          bumpLimit: existingBoard.settings.bumpLimit,
          defaultPosterName: existingBoard.settings.defaultPosterName,
          forceDefaultPosterName: existingBoard.settings.forceDefaultPosterName,
          countryFlags: existingBoard.settings.countryFlags,
          posterThreadIds: existingBoard.settings.posterThreadIds,
        },
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
            {existingBoard
              ? `Edit board /${existingBoard.label}/`
              : "Create new board"}
          </Header>
          <TextInput
            name="label"
            label="Label"
            placeholder="Label"
            required
            disabled={!!existingBoard}
          />
          <TextInput name="name" label="Name" placeholder="Name" required />
          <TextInput
            name="boardSettingsForm.threadLimit"
            label="Thread limit"
            placeholder="Thread limit"
            type="number"
            required
          />
          <TextInput
            name="boardSettingsForm.bumpLimit"
            label="Bump limit"
            placeholder="Bump limit"
            type="number"
            required
          />
          <Select
            multiple
            name="boardSettingsForm.attachmentCategories"
            label="Allowed attachment categories"
            options={attachmentCategories}
            required
          />
          <TextInput
            name="boardSettingsForm.defaultPosterName"
            label="Default poster name"
            placeholder="Default poster name"
          />
          <Checkbox
            name="boardSettingsForm.forceDefaultPosterName"
            label="Force default poster name"
          />
          <Checkbox name="boardSettingsForm.nsfw" label="NSFW" />
          <Checkbox
            name="boardSettingsForm.countryFlags"
            label="Enable country flags"
          />
          <Checkbox
            name="boardSettingsForm.posterThreadIds"
            label="Enable poster thread IDs"
          />
          <FormErrors errors={errors} />
          <Button fluid>
            {existingBoard ? "Update board" : "Create board"}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default BoardForm;
