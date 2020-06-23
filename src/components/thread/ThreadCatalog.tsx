import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";
import styled from "styled-components";
import { THREAD_URL } from "../../helpers/mappings";
import { BoardType, ThreadCatalogType, ThreadType } from "../../types";
import PostAttachment from "../post/PostAttachment";

interface ThreadCatalogProps {
  thread: ThreadCatalogType;
  board: BoardType;
}

const ThreadPreview = styled(Grid.Column)`
  vertical-align: top;
  display: inline-block;
  word-wrap: break-word;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 20px;
  padding: 5px 0 30px;
  position: relative;
`;

const ThreadMeta = styled.div`
  cursor: help;
  font-size: 11px;
  line-height: 8px;
  margin-top: 2px;
  margin-bottom: 1px;
`;

function ThreadCatalog({ thread, board }: ThreadCatalogProps) {
  return (
    <ThreadPreview>
      <Link to={THREAD_URL(thread as ThreadType, board)}>
        <Image src={thread.originalPost.attachment!.url} />
      </Link>
      <ThreadMeta>
        R: <strong>{thread.statistics.replyCount}</strong> / I:{" "}
        <strong>{thread.statistics.attachmentCount}</strong>
      </ThreadMeta>
      <div style={{ padding: "0 15px" }}>{thread.originalPost.body}</div>
    </ThreadPreview>
  );
}

export default ThreadCatalog;
