import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Divider,
  Form as SemanticForm,
  Header,
  Icon,
  Portal,
  Segment,
} from "semantic-ui-react";
import Draggable from "react-draggable";
import { Ref } from "@stardust-ui/react-component-ref";
import styled from "styled-components/macro";
import { apiErrorHandler, putApiRequest } from "../../helpers/api";
import { objectToJsonBlob } from "../../helpers/utils";
import { THREAD_URL } from "../../helpers/mappings";
import { AttachmentCategoryNameEnum, PostType } from "../../types";
import { BoardContext } from "../board/Board";
import Form, {
  Button,
  Captcha,
  Checkbox,
  FileInput,
  FormErrors,
  ProgressBar,
  TextArea,
  TextInput,
} from "../form/Form";
import { ThreadContext } from "../thread/Thread";
import { AppContext } from "../App";
import useProgress from "../form/useProgress";
import { addToOwnPosts } from "./ownPosts";
import {
  getFromLocalStorage,
  LocalStorageKey,
} from "../../helpers/localStorageItems";

const ReplyForm = styled(Segment)`
  padding-bottom: 10px !important;
  z-index: 1000;
  left: 50%;
  position: fixed !important;
  bottom: 0;

  @media screen and (max-width: 480px) {
    left: 10% !important;
  }
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
  const { user, inputConstraints } = useContext(AppContext);
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
  const [uploading, setUploading] = useState<boolean>(false);

  const { uploadProgress, updateProgress, resetProgress } = useProgress();

  const replyBodyRef = useRef<HTMLInputElement>(null);
  const getReplyBody = () =>
    replyBodyRef.current?.lastElementChild as HTMLInputElement;

  function handleSubmit(post: PostType) {
    setUploading(true);
    setErrors(undefined);

    const replyForm = new FormData();
    replyForm.append("postForm", objectToJsonBlob(post));
    if (attachment) {
      replyForm.append("attachment", attachment);
    }

    putApiRequest<PostType>(THREAD_URL(thread, board), replyForm, {
      onUploadProgress: (e) => updateProgress(e),
    })
      .then((result) => {
        addToOwnPosts(result.postNumber, board.label);
        setReplyFormOpen(false);
        setAttachment(undefined);
        triggerThreadUpdateButton();
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      })
      .catch(apiErrorHandler)
      .finally(() => {
        setUploading(false);
        resetProgress();
      });
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

  function isEmbedAllowed() {
    return board.settings.attachmentCategories
      .map((category) => category.name)
      .includes(AttachmentCategoryNameEnum.EMBED);
  }

  const defaultValues = {
    name: board.settings.defaultPosterName ?? "",
    deletionCode: getFromLocalStorage(LocalStorageKey.DELETION_CODE),
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
              Reply to thread #{thread.threadNumber}
              <CloseIcon
                fitted
                link
                name="close"
                onClick={() => setReplyFormOpen(false)}
                className="reply-close-icon not-draggable"
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
                rules={{
                  maxLength: {
                    value: inputConstraints.MAX_NAME_LENGTH,
                    message: inputConstraints.MAX_NAME_LENGTH,
                  },
                }}
              />
              <TextInput
                fluid
                name="password"
                label="Tripcode password"
                placeholder="Password"
                className="not-draggable"
                rules={{
                  maxLength: {
                    value: inputConstraints.MAX_TRIPCODE_PASSWORD_LENGTH,
                    message: inputConstraints.MAX_TRIPCODE_PASSWORD_LENGTH,
                  },
                }}
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
                rules={{
                  maxLength: {
                    value: inputConstraints.MAX_POST_LENGTH,
                    message: inputConstraints.MAX_POST_LENGTH,
                  },
                }}
              />
            </Ref>
            <SemanticForm.Group inline>
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
            </SemanticForm.Group>
            <FileInput
              name="attachment"
              maxSize={inputConstraints.MAX_ATTACHMENT_SIZE}
              label="Upload image"
              accept={getAllowedFileTypes()}
              onFileUpload={setAttachment}
              className="not-draggable"
            />
            {isEmbedAllowed() && (
              <>
                <Divider horizontal content="OR" />
                <TextInput
                  fluid
                  name="embedUrl"
                  label="Embed URL"
                  placeholder="Embed URL"
                  className="not-dragsgable"
                />
              </>
            )}
            <TextInput hidden name="deletionCode" />
            <FormErrors errors={errors} />
            <ProgressBar
              visible={attachment && uploading}
              percent={uploadProgress}
            />
            {board.settings.captchaEnabled && <Captcha name="captchaToken" />}
            <Button
              disabled={uploading}
              floated="right"
              className="not-draggable"
            >
              Submit post
            </Button>
          </Form>
        </ReplyForm>
      </Draggable>
    </Portal>
  );
}

export default PostForm;
