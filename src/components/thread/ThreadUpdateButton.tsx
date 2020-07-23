import { Ref } from "@stardust-ui/react-component-ref";
import React, { useContext, useState } from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { THREAD_URL } from "../../helpers/mappings";
import { PostType } from "../../types";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "./Thread";
import { markCrossLinksToOwnPosts } from "../post/ownPosts";

const ThreadUpdateButton = React.forwardRef((props, threadUpdateButtonRef) => {
  const board = useContext(BoardContext);
  const { thread, refreshThread } = useContext(ThreadContext);

  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState<number>();

  function checkForNewReplies() {
    setStatus("Updating...");

    const lastPostNumber =
      thread.replies.length > 0
        ? thread.replies[thread.replies.length - 1].postNumber
        : thread.originalPost.postNumber;

    getApiRequest<PostType[]>(
      `${THREAD_URL(thread, board)}/new-replies?lastPost=${lastPostNumber}`
    )
      .then((replies) => {
        setStatus(
          replies.length > 0
            ? `Fetched ${replies.length} new ${
                replies.length === 1 ? "reply" : "replies"
              }`
            : "No new replies"
        );
        addNewReplies(replies);
      })
      .catch(() => setStatus("This thread was deleted"));
  }

  function addNewReplies(replies: PostType[]) {
    if (replies.length > 0) {
      replies.forEach((reply) => {
        thread.statistics.replyCount++;
        if (reply.attachment) {
          thread.statistics.attachmentCount++;
        }
        thread.replies.push(reply);
      });
      refreshThread();
      markCrossLinksToOwnPosts(thread);
    }
  }

  function toggleTimer() {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    } else {
      const handler = setInterval(checkForNewReplies, 5000);
      setTimer(handler);
    }
  }

  return (
    <>
      <Ref innerRef={threadUpdateButtonRef}>
        <Button basic size="small" onClick={checkForNewReplies}>
          <Icon name="refresh" />
          <strong>Update</strong>
        </Button>
      </Ref>
      <Checkbox onChange={toggleTimer} label="Auto" toggle />
      <em>&nbsp; {status}</em>
    </>
  );
});

export default ThreadUpdateButton;
