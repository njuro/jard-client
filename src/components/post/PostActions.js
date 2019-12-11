import React, { useContext } from "react";
import PostForm from "./PostForm";
import { Button, Icon } from "semantic-ui-react";
import { deleteApiRequest, postApiRequest } from "../../helpers/api";
import { DELETE_POST, TOGGLE_LOCK_THREAD, TOGGLE_STICKY_THREAD, useAuthority } from "../../helpers/authorities";
import { ThreadContext } from "../thread/Thread";
import { BoardContext } from "../board/Board";
import { THREAD_URL } from "../../helpers/mappings";

function PostActions({ post, isOP }) {
  const board = useContext(BoardContext);
  const { thread, onToggleSticky, onToggleLock, onDeletePost } = useContext(
    ThreadContext
  );

  function toggleSticky() {
    postApiRequest(THREAD_URL(thread, board) + "/sticky").then(onToggleSticky);
  }

  function toggleLock() {
    postApiRequest(THREAD_URL(thread, board) + "/lock").then(onToggleLock);
  }

  function deletePost() {
    deleteApiRequest(THREAD_URL(thread, board) + "/" + post.postNumber).then(
      onDeletePost(post.postNumber)
    );
  }

  return (
    <>
      {!thread.locked && <PostForm />}
      {useAuthority(TOGGLE_STICKY_THREAD) && isOP && (
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
      {useAuthority(TOGGLE_LOCK_THREAD) && isOP && (
        <Button
          basic
          circular
          size="mini"
          icon={<Icon name={thread.locked ? "open lock" : "lock"} />}
          onClick={toggleLock}
        />
      )}
      {useAuthority(DELETE_POST) && (
        <Button
          basic
          circular
          size="mini"
          icon={<Icon name="alternate trash" />}
          onClick={deletePost}
        />
      )}
      {isOP && thread.stickied && <Icon name="thumbtack" />}
      {isOP && thread.locked && <Icon name="lock" />}
    </>
  );
}

export default PostActions;
