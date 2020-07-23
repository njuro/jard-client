import React, { useContext, useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { deleteApiRequest } from "../../../helpers/api";
import { THREAD_URL } from "../../../helpers/mappings";
import { UserAuthority } from "../../../types";
import { BoardContext } from "../../board/Board";
import { ThreadContext } from "../../thread/Thread";
import useAuthority from "../../../helpers/useAuthority";
import { PostContext } from "../Post";

function DeletePostButton() {
  const board = useContext(BoardContext);
  const { thread, setThread, refreshThread } = useContext(ThreadContext);
  const { post, isOP } = useContext(PostContext);

  const [deleteFormOpen, setDeleteFormOpen] = useState<boolean>();

  function deletePost() {
    deleteApiRequest(`${THREAD_URL(thread, board)}/${post.postNumber}`).then(
      () => {
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
      }
    );
  }

  if (!useAuthority(UserAuthority.DELETE_POST)) {
    return null;
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
        content={`Are you sure you want to delete post #${post.postNumber} on /${board.label}/?`}
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
