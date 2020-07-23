import React, { useContext, useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { deleteApiRequest, postApiRequest } from "../../helpers/api";
import useAuthority from "../../helpers/useAuthority";
import { THREAD_URL } from "../../helpers/mappings";
import { PostType, UserAuthority } from "../../types";
import BanForm from "../ban/BanForm";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "../thread/Thread";

interface PostActionsProps {
  post: PostType;
  isOP: boolean;
}
function PostActions({ post, isOP }: PostActionsProps) {
  const board = useContext(BoardContext);
  const { thread, setThread, refreshThread } = useContext(ThreadContext);
  const history = useHistory();

  const [deleteFormOpen, setDeleteFormOpen] = useState<boolean>();

  function toggleSticky() {
    postApiRequest(`${THREAD_URL(thread, board)}/sticky`).then(() => {
      thread.stickied = !thread.stickied;
      refreshThread();
    });
  }

  function toggleLock() {
    postApiRequest(`${THREAD_URL(thread, board)}/lock`).then(() => {
      thread.locked = !thread.locked;
      refreshThread();
    });
  }

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

  return (
    <>
      {!thread.locked &&
        isOP &&
        history.location.pathname !== THREAD_URL(thread, board) && (
          <Popup
            content="Reply"
            position="top center"
            trigger={
              <Button
                basic
                circular
                size="mini"
                icon="reply"
                onClick={() => history.push(THREAD_URL(thread, board))}
              />
            }
          />
        )}
      {useAuthority(UserAuthority.TOGGLE_STICKY_THREAD) && isOP && (
        <Popup
          content={thread.stickied ? "Unsticky" : "Sticky"}
          position="top center"
          trigger={
            <Button
              basic
              circular
              size="mini"
              icon={
                <Icon
                  name="thumbtack"
                  flipped={thread.stickied ? "vertically" : undefined}
                />
              }
              onClick={toggleSticky}
            />
          }
        />
      )}
      {useAuthority(UserAuthority.TOGGLE_LOCK_THREAD) && isOP && (
        <Popup
          content={thread.locked ? "Unlock" : "Lock"}
          position="top center"
          trigger={
            <Button
              basic
              circular
              size="mini"
              icon={<Icon name={thread.locked ? "lock open" : "lock"} />}
              onClick={toggleLock}
            />
          }
        />
      )}
      {useAuthority(UserAuthority.DELETE_POST) && (
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
      )}
      {useAuthority(UserAuthority.MANAGE_BANS) && (
        // TODO popup not working
        <BanForm
          trigger={
            <Button basic circular size="mini" icon={<Icon name="ban" />} />
          }
          ip={post.ip}
        />
      )}
      {isOP && thread.stickied && (
        <Popup
          content="Stickied"
          position="top center"
          trigger={<Icon name="thumbtack" />}
        />
      )}
      {isOP && thread.locked && (
        <Popup
          content="Locked"
          position="top center"
          trigger={<Icon name="lock" />}
        />
      )}
    </>
  );
}

export default PostActions;
