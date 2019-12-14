import React, { useContext, useState } from "react";
import { putApiRequest } from "../../helpers/api";
import {
  Button as SemanticButton,
  Form as SemanticForm,
  Header,
  Modal
} from "semantic-ui-react";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "../thread/Thread";
import { objectToJsonBlob } from "../../helpers/forms";
import { THREAD_URL } from "../../helpers/mappings";
import Form, {
  Button,
  FileInput,
  FormErrors,
  TextArea,
  TextInput
} from "../form/Form";
import { PostType } from "../../types";

function PostForm() {
  const board = useContext(BoardContext);
  const { thread, triggerThreadUpdateButton } = useContext(ThreadContext);

  const [attachment, setAttachment] = useState<File>();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>();

  function handleSubmit(post: PostType) {
    const replyForm = new FormData();
    replyForm.append("postForm", objectToJsonBlob(post));
    replyForm.append("attachment", attachment!);

    putApiRequest(THREAD_URL(thread, board), replyForm)
      .then(() => {
        setOpen(false);
        triggerThreadUpdateButton();
      })
      .catch(err => setErrors(err.response.data.errors));
  }

  return (
    <Modal
      style={{ paddingBottom: "10px" }}
      open={open}
      trigger={
        <SemanticButton
          basic
          circular
          size="mini"
          icon="reply"
          onClick={() => setOpen(true)}
        />
      }
      onClose={() => setOpen(false)}
    >
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          error={errors !== undefined}
        >
          <Header as="h4" dividing>
            Reply to thread
          </Header>
          <SemanticForm.Group widths="equal">
            <TextInput fluid name="name" label="Name" placeholder="Name" />
            <TextInput
              fluid
              name="password"
              label="Tripcode password"
              placeholder="Password"
            />
          </SemanticForm.Group>
          <TextArea name="body" label="Comment" rows="8" />
          <FileInput
            name="attachment"
            label="Upload image"
            accept="image/*"
            onFileUpload={setAttachment}
          />
          <FormErrors errors={errors} />
          <Button floated="right">Submit post</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default PostForm;
