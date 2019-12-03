import React, { useEffect, useState } from "react";
import { Form, Header, Segment } from "semantic-ui-react";
import FormErrors from "../utils/FormErrors";
import { getApiRequest, postApiRequest } from "../../helpers/api";
import { BOARD_URL, BOARDS_URL } from "../../helpers/mappings";
import { Redirect } from "react-router-dom";

function BoardForm(props) {
  const [label, setLabel] = useState("");
  const [name, setName] = useState("");
  const [attachmentTypes, setAttachmentTypes] = useState([]);
  const [attachmentType, setAttachmentType] = useState(undefined);
  const [nsfw, setNsfw] = useState(false);
  const [createdBoard, setCreatedBoard] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  useEffect(() => {
    getApiRequest(BOARDS_URL + "/types").then(types =>
      setAttachmentTypes(
        types.map(type => {
          return {
            key: type.name,
            text: type.description,
            value: type.name
          };
        })
      )
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const boardForm = { label, name, attachmentType, nsfw };
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
        <Form.Input
          label="Label"
          placeholder="Label"
          value={label}
          onChange={e => setLabel(e.target.value)}
          required
        />
        <Form.Input
          label="Name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Form.Select
          label="Allowed attachment types"
          options={attachmentTypes}
          onChange={(e, { value }) => setAttachmentType(value)}
          required
        />
        <Form.Checkbox
          label="NSFW"
          checked={nsfw}
          onChange={() => setNsfw(!nsfw)}
        />
        <FormErrors errors={errors} />
        <Form.Button fluid>Create board</Form.Button>
      </Segment>
    </Form>
  );
}

export default BoardForm;
