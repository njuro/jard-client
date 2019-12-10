import React, { useContext, useState } from "react";
import { postApiRequest } from "../../helpers/api";
import { Button, Form as SemanticForm, Header, Modal } from "semantic-ui-react";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "../thread/Thread";
import { objectToFormData } from "../../helpers/forms";
import { THREAD_URL } from "../../helpers/mappings";
import Form, {
  Button as FormButton,
  FileInput,
  FormErrors,
  TextArea,
  TextInput
} from "../form/Form";

function PostForm() {
  const board = useContext(BoardContext);
  const { thread, onNewPosts } = useContext(ThreadContext);

  const [attachment, setAttachment] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(undefined);

  function handleSubmit(post) {
    const replyForm = new FormData();
    replyForm.append("postForm", objectToFormData(post));
    replyForm.append("attachment", attachment);

    postApiRequest(THREAD_URL(thread, board) + "/reply", replyForm)
      .then(post => {
        setOpen(false);
        onNewPosts([post]);
      })
      .catch(err => setErrors(err.response.data.errors));
  }

  return (
    <Modal
      style={{ paddingBottom: "10px" }}
      open={open}
      trigger={
        <Button
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
          <FormButton floated="right">Submit post</FormButton>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default PostForm;
