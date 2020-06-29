import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form as SemanticForm,
  Header,
  Portal,
  Segment,
} from "semantic-ui-react";
import Draggable from "react-draggable";
import { Ref } from "@stardust-ui/react-component-ref";
import { putApiRequest } from "../../helpers/api";
import { objectToJsonBlob } from "../../helpers/forms";
import { THREAD_URL } from "../../helpers/mappings";
import { PostType } from "../../types";
import { BoardContext } from "../board/Board";
import Form, {
  Button,
  FileInput,
  FormErrors,
  TextArea,
  TextInput,
} from "../form/Form";
import { ThreadContext } from "../thread/Thread";

function PostForm() {
  const board = useContext(BoardContext);
  const {
    thread,
    triggerThreadUpdateButton,
    replyFormOpen,
    setReplyFormOpen,
    appendToReply,
    setAppendToReply,
  } = useContext(ThreadContext);

  const [attachment, setAttachment] = useState<File>();
  const [errors, setErrors] = useState<object>();
  const replyBodyRef = useRef<HTMLInputElement>(null);
  const getReplyBody = () =>
    replyBodyRef.current?.lastElementChild as HTMLInputElement;

  function handleSubmit(post: PostType) {
    const replyForm = new FormData();
    replyForm.append("postForm", objectToJsonBlob(post));
    replyForm.append("attachment", attachment!);

    putApiRequest(THREAD_URL(thread, board), replyForm)
      .then(() => {
        setReplyFormOpen(false);
        triggerThreadUpdateButton();
      })
      .catch((err) => setErrors(err.response.data.errors));
  }

  useEffect(() => {
    if (appendToReply !== "" && replyBodyRef.current) {
      getReplyBody().innerHTML += appendToReply;
      setAppendToReply("");
      getReplyBody().focus();
    }
  }, [appendToReply, setAppendToReply]);

  return (
    <Portal
      open={replyFormOpen}
      onClose={() => setReplyFormOpen(false)}
      closeOnDocumentClick={false}
    >
      <Draggable>
        <Segment
          style={{
            paddingBottom: "10px",
            zIndex: 1000,
            left: "40%",
            position: "fixed",
            top: "50%",
          }}
        >
          <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            error={!!errors}
          >
            <Header as="h4" dividing>
              Reply to thread #{thread.originalPost.postNumber}
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
            <Ref innerRef={replyBodyRef}>
              <TextArea name="body" label="Comment" rows="8" />
            </Ref>
            <FileInput
              name="attachment"
              label="Upload image"
              accept="image/*"
              onFileUpload={setAttachment}
            />
            <FormErrors errors={errors} />
            <Button floated="right">Submit post</Button>
          </Form>
        </Segment>
      </Draggable>
    </Portal>
  );
}

export default PostForm;
