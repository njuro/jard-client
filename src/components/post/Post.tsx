/* eslint-disable react/no-danger */
import React, { SyntheticEvent, useContext } from "react";
import { Item } from "semantic-ui-react";
import styled from "styled-components";
import { PostType } from "../../types";
import OmittedReplies from "../thread/OmittedReplies";
import { ThreadContext } from "../thread/Thread";
import PostActions from "./PostActions";
import PostAttachment from "./PostAttachment";
import { BoardContext } from "../board/Board";
import { POST_URL } from "../../helpers/mappings";
import { formatTimestamp } from "../../helpers/utils";
import {
  getFromLocalStorage,
  LocalStorageKey,
  saveToLocalStorage,
} from "../../helpers/localStorageItems";

const OriginalPost = styled(Item)`
  max-width: 80%;
`;
const Reply = styled(Item)`
  margin-left: 40px !important;
  padding-right: 40px !important;
  max-width: 80%;
`;
const ThreadSubject = styled.span`
  color: lightseagreen;
  font-weight: bold;
`;
const PosterName = styled.span`
  font-weight: bold;
`;
const OwnPost = styled.span`
  font-style: italic;
`;
const Tripcode = styled.span`
  color: lightseagreen;
`;
const Capcode = styled.span`
  color: red;
  font-weight: bold;
`;
const Sage = styled.span`
  color: darkorange;
  font-weight: bold;
`;
const PostTimestamp = styled.span``;
const PostNumber = styled.span``;
const PostBody = styled.div`
  margin-bottom: 50px !important;
`;
const OmittedRepliesStatus = styled(OmittedReplies)`
  position: absolute !important;
  bottom: 0;
  top: unset !important;
  left: unset !important;
`;

export function isOwnPost(postNumber: number | string, boardLabel: string) {
  const ownPosts = getFromLocalStorage(LocalStorageKey.OWN_POSTS);
  return ownPosts && ownPosts[boardLabel]?.includes(postNumber);
}

export function addToOwnPosts(postNumber: string | number, boardLabel: string) {
  const ownPosts = getFromLocalStorage(LocalStorageKey.OWN_POSTS);
  if (ownPosts) {
    if (ownPosts[boardLabel]) {
      ownPosts[boardLabel].push(postNumber);
    } else {
      ownPosts[boardLabel] = [postNumber];
    }
    saveToLocalStorage(LocalStorageKey.OWN_POSTS, ownPosts);
  } else {
    saveToLocalStorage(LocalStorageKey.OWN_POSTS, {
      [boardLabel]: [postNumber],
    });
  }
}

interface PostProps {
  post: PostType;
  isOP: boolean;
}
function Post({ post, isOP }: PostProps) {
  const YOU = "(You)";

  const board = useContext(BoardContext);
  const { thread, setReplyFormOpen, setAppendToReply } = useContext(
    ThreadContext
  );

  function quotePost(e: SyntheticEvent) {
    e.preventDefault();
    setReplyFormOpen(true);
    const selectedText = window?.getSelection()?.toString();
    setAppendToReply(
      `>>${post.postNumber}\n${selectedText !== "" ? `>${selectedText}\n` : ""}`
    );
  }

  const ThreadPost = isOP ? OriginalPost : Reply;

  return (
    <ThreadPost id={post.postNumber}>
      {post.attachment && <PostAttachment attachment={post.attachment} />}
      <Item.Content style={{ position: "relative" }}>
        <Item.Meta style={{ marginTop: "0" }}>
          {post.sage && <Sage>[SAGE]</Sage>}
          <PosterName>{post.name}</PosterName>
          {isOwnPost(post.postNumber, board.label) && <OwnPost>{YOU}</OwnPost>}
          {post.capcode && <Capcode>{`[${post.capcode}]`}</Capcode>}
          {post.tripcode && <Tripcode>{post.tripcode}</Tripcode>}
          {isOP && <ThreadSubject>{thread.subject}</ThreadSubject>}
          <PostTimestamp>{formatTimestamp(post.createdAt, true)}</PostTimestamp>
          <PostNumber>
            No.{" "}
            <a href={POST_URL(post, thread, board)} onClick={quotePost}>
              {post.postNumber}
            </a>
          </PostNumber>
          <PostActions post={post} isOP={isOP} />
        </Item.Meta>
        <PostBody dangerouslySetInnerHTML={{ __html: post.body }} />
        {isOP && <OmittedRepliesStatus />}
      </Item.Content>
    </ThreadPost>
  );
}

export default Post;
