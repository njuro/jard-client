import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { deleteApiRequest, postApiRequest } from "../../helpers/api";
import useAuthority from "../../helpers/authorities";
import { THREAD_URL } from "../../helpers/mappings";
import { PostType, UserAuthority } from "../../types";
import BanForm from "../ban/BanForm";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "../thread/Thread";
import PostForm from "./PostForm";

interface PostActionsProps {
  post: PostType;
  isOP: boolean;
}
function PostActions({ post, isOP }: PostActionsProps) {
  const board = useContext(BoardContext);
  const { thread, setThread, refreshThread } = useContext(ThreadContext);

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
      {!thread.locked && <PostForm />}
      {/* TODO popup not working */}
      {useAuthority(UserAuthority.TOGGLE_STICKY_THREAD) && isOP && (
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
      )}
      {useAuthority(UserAuthority.TOGGLE_LOCK_THREAD) && isOP && (
        <Button
          basic
          circular
          size="mini"
          icon={<Icon name={thread.locked ? "lock open" : "lock"} />}
          onClick={toggleLock}
        />
      )}
      {useAuthority(UserAuthority.DELETE_POST) && (
        <Button
          basic
          circular
          size="mini"
          icon={<Icon name="trash alternate" />}
          onClick={deletePost}
        />
      )}
      {useAuthority(UserAuthority.MANAGE_BANS) && (
        <BanForm
          trigger={
            <Button basic circular size="mini" icon={<Icon name="ban" />} />
          }
          ip={post.ip}
        />
      )}
      {isOP && thread.stickied && <Icon name="thumbtack" />}
      {isOP && thread.locked && <Icon name="lock" />}
    </>
  );
}

export default PostActions;
