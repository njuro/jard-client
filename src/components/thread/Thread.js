import React, { createContext, useRef, useState } from "react";
import { Item } from "semantic-ui-react";
import Post from "../post/Post";
import useUpdater from "../../helpers/updater";
import ThreadUpdateButton from "./ThreadUpdateButton";

export const ThreadContext = createContext();

function Thread({ thread: initialThread }) {
  const [thread, setThread] = useState(initialThread);
  const threadUpdateButtonRef = useRef(undefined);

  const refreshThread = useUpdater();

  function triggerThreadUpdateButton() {
    threadUpdateButtonRef.current.click();
  }

  return (
    (thread && (
      <ThreadContext.Provider
        value={{
          thread,
          setThread,
          refreshThread,
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
