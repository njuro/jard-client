import React, { createContext, useContext, useRef, useState } from "react";
import { Item } from "semantic-ui-react";
import Post from "../post/Post";
import useUpdater from "../../helpers/updater";
import ThreadUpdateButton from "./ThreadUpdateButton";
import { getApiRequest } from "../../helpers/api";
import { THREAD_URL } from "../../helpers/mappings";
import { BoardContext } from "../board/Board";

export const ThreadContext = createContext();

function Thread({ thread: initialThread }) {
  const board = useContext(BoardContext);

  const [thread, setThread] = useState(initialThread);
  const threadUpdateButtonRef = useRef(undefined);

  const updateThread = useUpdater();

  const omitted = thread.statistics.replyCount - thread.replies.length;
  const omittedAttachments =
    thread.statistics.attachmentCount -
    (thread.originalPost.attachment ? 1 : 0) -
    thread.replies.filter(reply => !!reply.attachment).length;

  function fetchAllReplies() {
    getApiRequest(THREAD_URL(thread, board) + "/replies").then(replies => {
      thread.replies = replies;
      updateThread();
    });
  }

  function triggerThreadUpdateButton() {
    threadUpdateButtonRef.current.click();
  }

  function onNewPosts(posts) {
    if (posts.length > 0) {
      posts.forEach(post => {
        thread.statistics.replyCount++;
        if (post.attachment) {
          thread.statistics.attachmentCount++;
        }
        thread.replies.push(post);
      });
      updateThread();
    }
  }

  function onToggleSticky() {
    thread.stickied = !thread.stickied;
    updateThread();
  }

  function onToggleLock() {
    thread.locked = !thread.locked;
    updateThread();
  }

  function onDeletePost(postNumber) {
    if (postNumber === thread.originalPost.postNumber) {
      setThread(undefined);
    } else {
      thread.replies = thread.replies.filter(
        reply => reply.postNumber !== postNumber
      );
      updateThread();
    }
  }

  return (
    (thread && (
      <ThreadContext.Provider
        value={{
          thread,
          setThread,
          onNewPosts,
          onToggleSticky,
          onToggleLock,
          onDeletePost,
          triggerThreadUpdateButton,
          fetchAllReplies
        }}
      >
        <Item.Group divided className="thread">
          <Post
            post={thread.originalPost}
            isOP={true}
            omitted={omitted}
            omittedAttachments={omittedAttachments}
          />
          {thread.replies.map(post => (
            <Post key={post.postNumber} post={post} isOP={false} />
          ))}
        </Item.Group>
        <ThreadUpdateButton ref={threadUpdateButtonRef} />
      </ThreadContext.Provider>
    )) || (
      <p>
        <em>This thread was deleted</em>
      </p>
    )
  );
}

export default Thread;
