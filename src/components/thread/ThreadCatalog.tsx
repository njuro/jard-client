import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image, Popup } from "semantic-ui-react";
import styled from "styled-components";
import { ATTACHMENT_THUMB_URL, THREAD_URL } from "../../helpers/mappings";
import { BoardType, ThreadCatalogType, ThreadType } from "../../types";

interface ThreadCatalogProps {
  thread: ThreadCatalogType;
  board: BoardType;
  showOP: boolean;
}

const ThreadPreview = styled(Grid.Column)`
  word-wrap: break-word;
  overflow: hidden;
  margin-bottom: 20px !important;
  padding: 5px 0 30px;
  max-height: 320px;
`;

const ThreadMeta = styled.div`
  cursor: help;
  font-size: 11px;
  line-height: 8px;
  margin-top: 4px;
  margin-bottom: 1px;
`;

function ThreadCatalog({ thread, board, showOP }: ThreadCatalogProps) {
  return (
    <ThreadPreview verticalAlign="top">
      <Link to={THREAD_URL(thread as ThreadType, board)}>
        <Image
          src={ATTACHMENT_THUMB_URL(thread.originalPost.attachment!)}
          style={{ margin: "auto", boxShadow: "0 0 5px rgba(0,0,0,.25)" }}
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
        <div style={{ padding: "0 15px;" }}>
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
