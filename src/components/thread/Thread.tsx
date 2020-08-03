import React, {
  createContext,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Item, Divider } from "semantic-ui-react";
import styled from "styled-components/macro";
import { useLocation } from "react-router-dom";
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
  isFull: boolean;
  setThread: SetStateType<ThreadType | undefined>;
  refreshThread: () => void;
  triggerThreadUpdateButton: () => void;
  replyFormOpen: boolean;
  setReplyFormOpen: SetStateType<boolean>;
  appendToReply: string;
  setAppendToReply: SetStateType<string>;
  quotePost: (e: SyntheticEvent, postNumber: number) => void;
  highlightPostsByPoster: (posterId: string) => void;
}
export const ThreadContext = createContext<ThreadContextProps>(
  {} as ThreadContextProps
);

interface ThreadProps {
  thread: ThreadType;
  full?: boolean;
}
function Thread({ thread: initialThread, full }: ThreadProps) {
  const isFull = !!full;
  const { hash } = useLocation();
  const [thread, setThread] = useState<ThreadType | undefined>(initialThread);
  const [replyFormOpen, setReplyFormOpen] = useState<boolean>(
    hash === "#reply"
  );
  const [appendToReply, setAppendToReply] = useState<string>("");
  const [highlightedPosterId, setHighlightedPosterId] = useState<string>();
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

  function highlightPostsByPoster(posterId: string) {
    const threadElement = document.getElementById(
      `thread-${thread?.originalPost.postNumber}`
    );
    if (threadElement) {
      Array.from(
        threadElement.getElementsByClassName("post highlighted")
      ).forEach((post) => post.classList.remove("highlighted"));

      if (posterId !== highlightedPosterId) {
        Array.from(
          threadElement.getElementsByClassName(`posterId-${posterId}`) ?? []
        ).forEach((posterIdElement) =>
          posterIdElement.closest(".post")?.classList.add("highlighted")
        );
        setHighlightedPosterId(posterId);
      } else {
        setHighlightedPosterId(undefined);
      }
    }
  }

  useEffect(() => {
    if (thread) {
      markCrossLinksToOwnPosts(thread);
      if (hash) {
        const linkedPost = document.getElementById(hash.substring(1));
        if (linkedPost) {
          window.scrollTo(0, linkedPost.getBoundingClientRect().top);
        }
      }
    }
  }, [hash, thread]);

  return (
    (thread && (
      <ThreadContext.Provider
        value={{
          thread,
          isFull,
          setThread,
          refreshThread,
          triggerThreadUpdateButton,
          replyFormOpen,
          setReplyFormOpen,
          appendToReply,
          setAppendToReply,
          quotePost,
          highlightPostsByPoster,
        }}
      >
        <PostForm />
        {isFull && <ThreadTopMenu />}
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
        {isFull && <ThreadBottomMenu />}
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
