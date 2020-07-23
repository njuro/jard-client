import React, { createContext, useEffect, useRef, useState } from "react";
import { Icon, Item, Button, Divider } from "semantic-ui-react";
import styled from "styled-components/macro";
import useUpdater from "../../helpers/useUpdater";
import { SetStateType, ThreadType } from "../../types";
import Post from "../post/Post";
import ThreadUpdateButton from "./ThreadUpdateButton";
import PostForm from "../post/PostForm";
import { markCrossLinksToOwnPosts } from "../post/ownPosts";
import { secondaryColor } from "../../helpers/theme";

const ThreadContainer = styled(Item.Group)`
  padding-left: 20px !important;
  border-left: 1px solid ${secondaryColor};
`;

interface ThreadContextProps {
  thread: ThreadType;
  setThread: SetStateType<ThreadType | undefined>;
  refreshThread: () => void;
  triggerThreadUpdateButton: () => void;
  replyFormOpen: boolean;
  setReplyFormOpen: SetStateType<boolean>;
  appendToReply: string;
  setAppendToReply: SetStateType<string>;
}
export const ThreadContext = createContext<ThreadContextProps>(
  {} as ThreadContextProps
);

interface ThreadProps {
  thread: ThreadType;
  full?: boolean;
}
function Thread({ thread: initialThread, full }: ThreadProps) {
  const [thread, setThread] = useState<ThreadType | undefined>(initialThread);
  const [replyFormOpen, setReplyFormOpen] = useState<boolean>(
    window.location.hash === "#reply"
  );
  const [appendToReply, setAppendToReply] = useState<string>("");
  const threadUpdateButtonRef = useRef<HTMLInputElement>(null);

  const refreshThread = useUpdater();

  function triggerThreadUpdateButton() {
    const threadUpdateButton = threadUpdateButtonRef.current;
    if (threadUpdateButton) {
      threadUpdateButton.click();
    }
  }

  useEffect(() => {
    if (thread) {
      markCrossLinksToOwnPosts(thread);
    }
  }, [thread]);

  const ReplyButton = () => (
    <Button basic size="small" onClick={() => setReplyFormOpen(true)}>
      <Icon name="plus" />
      <strong>New reply</strong>
    </Button>
  );

  return (
    (thread && (
      <ThreadContext.Provider
        value={{
          thread,
          setThread,
          refreshThread,
          triggerThreadUpdateButton,
          replyFormOpen,
          setReplyFormOpen,
          appendToReply,
          setAppendToReply,
        }}
      >
        <PostForm />
        {full && <ReplyButton />}
        {full && (
          <Button
            basic
            size="small"
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          >
            <Icon name="arrow down" />
            <strong>Bottom</strong>
          </Button>
        )}
        <Divider />
        <ThreadContainer
          className="thread"
          id={`thread-${thread.originalPost.postNumber}`}
        >
          <Post post={thread.originalPost} isOP />
          {thread.replies.map((post) => (
            <Post key={post.postNumber} post={post} isOP={false} />
          ))}
        </ThreadContainer>
        {full && <Divider />}
        {full && <ReplyButton />}
        {full && (
          <Button basic size="small" onClick={() => window.scrollTo(0, 0)}>
            <Icon name="arrow up" />
            <strong>Top</strong>
          </Button>
        )}
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
