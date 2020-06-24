import React, { createContext, useRef, useState } from "react";
import { Item } from "semantic-ui-react";
import useUpdater from "../../helpers/updater";
import { SetStateType, ThreadType } from "../../types";
import Post from "../post/Post";
import ThreadUpdateButton from "./ThreadUpdateButton";

interface ThreadContextProps {
  thread: ThreadType;
  setThread: SetStateType<ThreadType | undefined>;
  refreshThread: () => void;
  triggerThreadUpdateButton: () => void;
}
export const ThreadContext = createContext<ThreadContextProps>(
  {} as ThreadContextProps
);

interface ThreadProps {
  thread: ThreadType;
}
function Thread({ thread: initialThread }: ThreadProps) {
  const [thread, setThread] = useState<ThreadType | undefined>(initialThread);
  const threadUpdateButtonRef = useRef<HTMLInputElement>(null);

  const refreshThread = useUpdater();

  function triggerThreadUpdateButton() {
    threadUpdateButtonRef.current!.click();
  }

  return (
    (thread && (
      <ThreadContext.Provider
        value={{
          thread,
          setThread,
          refreshThread,
          triggerThreadUpdateButton,
        }}
      >
        <Item.Group divided className="thread">
          <Post post={thread.originalPost} isOP />
          {thread.replies.map((post) => (
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
