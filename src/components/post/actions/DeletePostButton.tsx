import React, { useContext, useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { apiErrorHandler, deleteApiRequest } from "../../../helpers/api";
import { THREAD_URL } from "../../../helpers/mappings";
import { UserAuthority } from "../../../types";
import { BoardContext } from "../../board/Board";
import { ThreadContext } from "../../thread/Thread";
import useAuthority from "../../../helpers/useAuthority";
import { PostContext } from "../Post";
import {
  getFromLocalStorage,
  LocalStorageKey,
} from "../../../helpers/localStorageItems";
import { notifyError, notifySuccess } from "../../../helpers/notifications";

function DeletePostButton() {
  const board = useContext(BoardContext);
  const { thread, setThread, refreshThread } = useContext(ThreadContext);
  const { post, isOP } = useContext(PostContext);

  const [deleteFormOpen, setDeleteFormOpen] = useState<boolean>();
  const hasDeleteAuthority = useAuthority(UserAuthority.DELETE_POST);

  function deletePost() {
    let deleteUrl = `${THREAD_URL(thread, board)}/${post.postNumber}`;
    if (!hasDeleteAuthority) {
      deleteUrl += "/delete-own";
    }
    const body = hasDeleteAuthority
      ? undefined
      : { deletionCode: getFromLocalStorage(LocalStorageKey.DELETION_CODE) };

    deleteApiRequest(deleteUrl, body)
      .then(() => {
        if (isOP) {
          setThread(undefined);
        } else {
          thread.replies = thread.replies.filter(
            (reply) => reply.postNumber !== post.postNumber
          );
          thread.statistics.replyCount--;
          if (post.attachment) {
            thread.statistics.attachmentCount--;
          }
          refreshThread();
        }
        notifySuccess(
          "Post deleted",
          `Post #${post.postNumber} was sucessfully deleted`
        );
      })
      .catch((err) =>
        notifyError(
          "Failed to delete post",
          Object.values(err.response.data.errors)[0] as string
        )
      )
      .catch(apiErrorHandler);
  }

  return (
    <>
      <Popup
        content="Delete"
        position="top center"
        trigger={
          <Button
            basic
            circular
            size="mini"
            icon={<Icon name="trash alternate" />}
            onClick={() => setDeleteFormOpen(true)}
          />
        }
      />
      <Confirm
        open={deleteFormOpen}
        header="Delete post"
        content={`Are you sure you want to delete post ${post.postNumber} on /${board.label}/?`}
        confirmButton="Yes"
        onConfirm={() => {
          deletePost();
          setDeleteFormOpen(false);
        }}
        onCancel={() => setDeleteFormOpen(false)}
      />
    </>
  );
}

export default DeletePostButton;
