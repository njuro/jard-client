import React, { createContext, useRef, useState } from "react";
import { Item } from "semantic-ui-react";
import Post from "../post/Post";
import useUpdater from "../../helpers/updater";
import ThreadUpdateButton from "./ThreadUpdateButton";

export const ThreadContext = createContext();

function Thread({ thread: initialThread }) {
  const [thread, setThread] = useState(initialThread);
  const threadUpdateButtonRef = useRef(undefined);

  const updateThread = useUpdater();

  function triggerThreadUpdateButton() {
    threadUpdateButtonRef.current.click();
  }

  function onNewPosts(posts) {
    if (posts.length > 0) {
      posts.forEach(post => thread.replies.push(post));
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
          triggerThreadUpdateButton
        }}
      >
        <Item.Group divided className="thread">
          <Post post={thread.originalPost} isOP={true} />
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
