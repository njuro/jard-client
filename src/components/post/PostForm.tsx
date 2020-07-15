import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form as SemanticForm,
  Header,
  Icon,
  Portal,
  Segment,
} from "semantic-ui-react";
import Draggable from "react-draggable";
import { Ref } from "@stardust-ui/react-component-ref";
import styled from "styled-components";
import { putApiRequest } from "../../helpers/api";
import { objectToJsonBlob } from "../../helpers/utils";
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
import Checkbox from "../form/Checkbox";
import { AppContext } from "../App";

const ReplyForm = styled(Segment)`
  padding-bottom: 10px !important;
  z-index: 1000;
  left: 40%;
  position: fixed !important;
  top: 40%;
`;

const CloseIcon = styled(Icon)`
  float: right;
  font-size: 1em !important;
  color: darkgray;
  &:hover {
    color: black;
  }
`;

function PostForm() {
  const { user } = useContext(AppContext);
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
    if (attachment) {
      replyForm.append("attachment", attachment);
    }

    putApiRequest(THREAD_URL(thread, board), replyForm)
      .then(() => {
        setReplyFormOpen(false);
        setAttachment(undefined);
        triggerThreadUpdateButton();
      })
      .catch((err) => setErrors(err.response.data.errors));
  }

  useEffect(() => {
    if (replyBodyRef.current) {
      if (appendToReply !== "") {
        getReplyBody().innerHTML += appendToReply;
        setAppendToReply("");
      }
      getReplyBody().focus();
    }
  }, [appendToReply, setAppendToReply, replyFormOpen]);

  function getAllowedFileTypes() {
    return board.settings.attachmentCategories
      .flatMap((category) => category.extensions)
      .join(",");
  }

  const defaultValues = {
    name: board.settings.defaultPosterName,
  };

  return (
    <Portal
      open={replyFormOpen}
      onClose={() => setReplyFormOpen(false)}
      closeOnDocumentClick={false}
    >
      <Draggable cancel=".not-draggable">
        <ReplyForm>
          <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            defaultValues={defaultValues}
            error={!!errors}
          >
            <Header as="h4" dividing>
              Reply to thread #{thread.originalPost.postNumber}
              <CloseIcon
                fitted
                link
                name="close"
                onClick={() => setReplyFormOpen(false)}
                className="not-draggable"
              />
            </Header>
            <SemanticForm.Group widths="equal">
              <TextInput
                fluid
                name="name"
                label="Name"
                placeholder="Name"
                disabled={board.settings.forceDefaultPosterName}
                className="not-draggable"
              />
              <TextInput
                fluid
                name="password"
                label="Tripcode password"
                placeholder="Password"
                className="not-draggable"
              />
            </SemanticForm.Group>
            <Ref innerRef={replyBodyRef}>
              <TextArea
                name="body"
                label="Comment"
                rows="8"
                style={{
                  resize: "both",
                  minWidth: "100%",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
                className="not-draggable"
              />
            </Ref>
            <Checkbox
              toggle
              name="sage"
              label="Sage"
              className="not-draggable"
            />
            {user && (
              <Checkbox
                toggle
                name="capcode"
                label="Capcode"
                className="not-draggable"
              />
            )}
            <FileInput
              name="attachment"
              label="Upload image"
              accept={getAllowedFileTypes()}
              onFileUpload={setAttachment}
              className="not-draggable"
            />
            <FormErrors errors={errors} />
            <Button floated="right" className="not-draggable">
              Submit post
            </Button>
          </Form>
        </ReplyForm>
      </Draggable>
    </Portal>
  );
}

export default PostForm;
