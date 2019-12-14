import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { getApiRequest } from "../../helpers/api";
import { THREAD_URL } from "../../helpers/mappings";
import { ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "./Thread";

function OmittedReplies() {
  const board = useContext(BoardContext);
  const { thread, setThread } = useContext(ThreadContext);

  const [expanded, setExpanded] = useState(false);

  const omitted = thread.statistics.replyCount - thread.replies.length;
  const omittedAttachments =
    thread.statistics.attachmentCount -
    (thread.originalPost.attachment ? 1 : 0) -
    thread.replies.filter(reply => !!reply.attachment).length;

  function fetchFullThread() {
    getApiRequest<ThreadType>(THREAD_URL(thread, board)).then(fullThread => {
      setThread(fullThread);
      setExpanded(true);
    });
  }

  function hideReplies() {
    thread.replies = thread.replies.slice(thread.replies.length - 5);
    setThread(thread);
  }

  function getThreadToggle() {
    if (omitted > 0) {
      return (
        <>
          {omitted} replies
          {omittedAttachments > 0 && ` and ${omittedAttachments} attachments`}
          &nbsp;were omitted.
          <Link to="#" onClick={fetchFullThread}>
            &nbsp;Click here to view them
          </Link>
        </>
      );
    } else if (expanded) {
      return (
        <Link to="#" onClick={hideReplies}>
          Hide expanded replies
        </Link>
      );
    }
  }

  return <Item.Extra style={{ top: "70%" }}>{getThreadToggle()}</Item.Extra>;
}

export default OmittedReplies;