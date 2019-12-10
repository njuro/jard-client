import React, { useEffect, useState } from "react";
import { Header, Segment } from "semantic-ui-react";
import { getApiRequest, postApiRequest } from "../../helpers/api";
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

function BoardForm(props) {
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
    postApiRequest(BOARDS_URL, boardForm)
      .then(setCreatedBoard)
      .catch(err => setErrors(err.response.data.errors));
  }

  if (createdBoard) {
    return <Redirect to={BOARD_URL(createdBoard)} />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className={"six wide column centered"}
      error={errors !== undefined}
    >
      <Segment>
        <Header as="h4" dividing>
          Create new board
        </Header>
        <TextInput name="label" label="Label" placeholder="Label" required />
        <TextInput name="name" label="Name" placeholder="Name" required />
        <Select
          name="attachmentType"
          label="Allowed attachment types"
          options={attachmentTypes}
          required
        />
        <Checkbox name="nsfw" label="NSFW" />
        <FormErrors errors={errors} />
        <Button fluid>Create board</Button>
      </Segment>
    </Form>
  );
}

export default BoardForm;
