import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Form as SemanticForm, Header, Icon, Modal } from "semantic-ui-react";
import { putApiRequest } from "../../helpers/api";
import { objectToJsonBlob } from "../../helpers/forms";
import { BOARD_URL, THREAD_URL } from "../../helpers/mappings";
import { ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import Form, {
  Button,
  FileInput,
  FormErrors,
  TextArea,
  TextInput,
} from "../form/Form";

function ThreadForm() {
  const board = useContext(BoardContext);

  const [attachment, setAttachment] = useState<File>();
  const [createdThread, setCreatedThread] = useState<ThreadType>();
  const [errors, setErrors] = useState<object>();

  function handleSubmit(thread: ThreadType) {
    const threadForm = new FormData();
    threadForm.append("threadForm", objectToJsonBlob(thread));
    threadForm.append("attachment", attachment!);

    putApiRequest<ThreadType>(`${BOARD_URL(board)}/thread`, threadForm)
      .then(setCreatedThread)
      .catch((err) => setErrors(err.response.data.errors));
  }

  if (createdThread) {
    return <Redirect to={THREAD_URL(createdThread, board)} />;
  }

  function getAllowedFileTypes() {
    return board.attachmentCategories
      .flatMap((category) => category.extensions)
      .join(",");
  }

  return (
    <Modal
      style={{ paddingBottom: "10px" }}
      trigger={
        <Button basic size="small">
          <Icon name="plus" />
          <strong>New thread</strong>
        </Button>
      }
    >
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          error={!!errors}
        >
          <Header as="h4" dividing>
            Create new thread
          </Header>
          <SemanticForm.Group widths="equal">
            <TextInput
              fluid
              name="postForm.name"
              label="Name"
              placeholder="Name"
            />
            <TextInput
              fluid
              name="postForm.password"
              label="Tripcode password"
              placeholder="Password"
            />
          </SemanticForm.Group>
          <TextInput name="subject" label="Subject" placeholder="Subject" />
          <TextArea name="postForm.body" label="Comment" rows="8" />
          <FileInput
            name="attachment"
            label="Upload image"
            accept={getAllowedFileTypes()}
            onFileUpload={setAttachment}
            required
          />
          <FormErrors errors={errors} />
          <Button floated="right">Create thread</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ThreadForm;
