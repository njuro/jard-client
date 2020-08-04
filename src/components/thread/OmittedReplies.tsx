import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { apiErrorHandler, getApiRequest } from "../../helpers/api";
import { THREAD_URL } from "../../helpers/mappings";
import { ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import { ThreadContext } from "./Thread";

interface OmittedRepliesProps {
  className?: string;
}
function OmittedReplies({ className }: OmittedRepliesProps) {
  const board = useContext(BoardContext);
  const { thread, setThread } = useContext(ThreadContext);

  const [expanded, setExpanded] = useState(false);

  const omitted = thread.statistics.replyCount - thread.replies.length;
  const omittedAttachments =
    thread.statistics.attachmentCount -
    (thread.originalPost.attachment ? 1 : 0) -
    thread.replies.filter((reply) => !!reply.attachment).length;

  function expandReplies() {
    getApiRequest<ThreadType>(THREAD_URL(thread, board))
      .then((fullThread) => {
        setThread(fullThread);
        setExpanded(true);
      })
      .catch(apiErrorHandler);
  }

  function collapseReplies() {
    thread.replies = thread.replies.slice(thread.replies.length - 5);
    setThread(thread);
  }

  function renderRepliesToggle() {
    if (omitted > 0) {
      const single = omitted === 1;
      return (
        <>
          {omitted} {single ? "reply" : "replies"}
          {omittedAttachments > 0 && ` and ${omittedAttachments} attachment(s)`}
          &nbsp;{single ? "was" : "were"} omitted.
          <Link to="#" onClick={expandReplies}>
            &nbsp;Click here to view {single ? "it" : "them"}
          </Link>
        </>
      );
    }
    if (expanded) {
      return (
        <Link to="#" onClick={collapseReplies}>
          Hide expanded replies
        </Link>
      );
    }

    return null;
  }

  return <Item.Extra className={className}>{renderRepliesToggle()}</Item.Extra>;
}

export default OmittedReplies;
