/* eslint-disable react/no-danger */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Popup } from "semantic-ui-react";
import styled from "styled-components/macro";
import { THREAD_URL } from "../../helpers/mappings";
import { ThreadCatalogType, ThreadType } from "../../types";
import { BoardContext } from "../board/Board";
import AttachmentThumbnail from "../attachment/AttachmentThumbnail";

const ThreadPreview = styled.div`
  vertical-align: top;
  margin-top: 5px;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 320px;
  margin-bottom: 20px;
  padding: 5px 0 3px;

  img,
  svg {
    max-width: 150px !important;
  }
`;

const ThreadMeta = styled.div`
  cursor: help;
  font-size: 11px;
  line-height: 8px;
  margin-top: 4px;
  margin-bottom: 1px;
`;

interface ThreadCatalogProps {
  thread: ThreadCatalogType;
  showOP: boolean;
}
function ThreadCatalog({ thread, showOP }: ThreadCatalogProps) {
  const board = useContext(BoardContext);

  return (
    <ThreadPreview>
      <Link to={THREAD_URL(thread as ThreadType, board)}>
        <AttachmentThumbnail
          attachment={thread.originalPost.attachment}
          size="150px"
        />
      </Link>
      <Popup
        content="[R]eplies / [I]mage replies"
        position="top center"
        trigger={
          <ThreadMeta>
            R: <strong>{thread.statistics.replyCount}</strong> / I:{" "}
            <strong>{thread.statistics.attachmentCount}</strong>
          </ThreadMeta>
        }
      />
      {showOP && (
        <div style={{ padding: "0 15px" }}>
          {thread.subject && <strong>{thread.subject}: </strong>}
          <span
            dangerouslySetInnerHTML={{ __html: thread.originalPost.body }}
          />
        </div>
      )}
    </ThreadPreview>
  );
}

export default ThreadCatalog;
