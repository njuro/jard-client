import React, {
  createContext,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Item, Divider } from "semantic-ui-react";
import styled from "styled-components/macro";
import useUpdater from "../../helpers/useUpdater";
import { SetStateType, ThreadType } from "../../types";
import Post from "../post/Post";
import ThreadUpdateButton from "./ThreadUpdateButton";
import PostForm from "../post/PostForm";
import { markCrossLinksToOwnPosts } from "../post/ownPosts";
import { secondaryColor } from "../../helpers/theme";
import ThreadTopMenu from "./ThreadTopMenu";
import ThreadBottomMenu from "./ThreadBottomMenu";

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
  quotePost: (e: SyntheticEvent, postNumber: number) => void;
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

  function quotePost(e: SyntheticEvent, postNumber: number) {
    e.preventDefault();
    if (!replyFormOpen) {
      closeAllReplyForms();
      setReplyFormOpen(true);
    }
    const selectedText = window?.getSelection()?.toString();
    setAppendToReply(
      `>>${postNumber}\n${selectedText !== "" ? `>${selectedText}\n` : ""}`
    );
  }

  function closeAllReplyForms() {
    Array.from(document.getElementsByClassName("reply-close-icon")).forEach(
      (element) => {
        if (element instanceof HTMLElement) {
          element.click();
        }
      }
    );
  }

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
          quotePost,
        }}
      >
        <PostForm />
        {full && <ThreadTopMenu />}
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
        {full && <ThreadBottomMenu />}
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
