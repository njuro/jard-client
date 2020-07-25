import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Divider,
  Form as SemanticForm,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import { FieldValues } from "react-hook-form/dist/types/form";
import { putApiRequest } from "../../helpers/api";
import { objectToJsonBlob } from "../../helpers/utils";
import { BOARD_URL, THREAD_URL } from "../../helpers/mappings";
import { AttachmentCategoryNameEnum, ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import Form, {
  Button,
  FileInput,
  FormErrors,
  TextArea,
  TextInput,
} from "../form/Form";
import { AppContext } from "../App";
import Checkbox from "../form/Checkbox";
import ProgressBar from "../form/ProgressBar";
import useProgress from "../../helpers/useProgress";
import { addToOwnPosts } from "../post/ownPosts";

function ThreadForm() {
  const { user } = useContext(AppContext);
  const board = useContext(BoardContext);

  const [attachment, setAttachment] = useState<File>();
  const [createdThread, setCreatedThread] = useState<ThreadType>();
  const [errors, setErrors] = useState<object>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [savedValues, setSavedValues] = useState<FieldValues>({
    postForm: {
      name: board.settings.defaultPosterName,
    },
  });
  const { uploadProgress, updateProgress, resetProgress } = useProgress();

  function handleSubmit(thread: ThreadType) {
    setUploading(true);
    setErrors(undefined);

    const threadForm = new FormData();
    threadForm.append("threadForm", objectToJsonBlob(thread));
    if (attachment) {
      threadForm.append("attachment", attachment);
    }

    putApiRequest<ThreadType>(`${BOARD_URL(board)}/thread`, threadForm, {
      onUploadProgress: (e) => updateProgress(e),
    })
      .then((result) => {
        addToOwnPosts(result.originalPost.postNumber, board.label);
        setUploading(false);
        resetProgress();
        setCreatedThread(result);
      })
      .catch((err) => {
        setUploading(false);
        resetProgress();
        setErrors(err.response.data.errors);
      });
  }

  if (createdThread) {
    return <Redirect to={THREAD_URL(createdThread, board)} />;
  }

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
          onUnmount={setSavedValues}
          encType="multipart/form-data"
          defaultValues={savedValues}
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
              disabled={board.settings.forceDefaultPosterName}
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
          {user && <Checkbox toggle name="postForm.capcode" label="Capcode" />}
          <FileInput
            name="attachment"
            label="Upload image"
            accept={getAllowedFileTypes()}
            onFileUpload={setAttachment}
          />
          {isEmbedAllowed() && (
            <>
              <Divider horizontal content="OR" />
              <TextInput
                fluid
                name="postForm.embedUrl"
                label="Embed URL"
                placeholder="Embed URL"
              />
            </>
          )}
          <FormErrors errors={errors} />
          <ProgressBar
            visible={attachment && uploading}
            percent={uploadProgress}
          />
          <Button floated="right" disabled={uploading}>
            Create thread
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ThreadForm;
