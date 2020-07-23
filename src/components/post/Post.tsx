/* eslint-disable react/no-danger */
import React, { createContext, useContext } from "react";
import { Item } from "semantic-ui-react";
import styled from "styled-components/macro";
import { PostType } from "../../types";
import OmittedReplies from "../thread/OmittedReplies";
import { ThreadContext } from "../thread/Thread";
import PostActions from "./PostActions";
import PostAttachment from "./PostAttachment";
import { BoardContext } from "../board/Board";
import { POST_URL } from "../../helpers/mappings";
import { formatTimestamp } from "../../helpers/utils";
import { isOwnPost, YOU } from "./ownPosts";
import { secondaryColor } from "../../helpers/theme";

const ThreadLink = styled.div`
  width: 20px !important;
  border-bottom: 1px solid ${secondaryColor};
  min-height: 1px !important;
  position: absolute !important;
  left: 10px;
  align-self: center !important;
`;
const OriginalPost = styled(Item)`
  margin-left: -21px !important;

  @media screen and (min-width: 480px) {
    .content {
      padding-top: 0 !important;
  }
`;
const Reply = styled(Item)`
  width: max-content !important;
  padding: 0 20px 0 0 !important;
  background-color: ${(props) => props.theme.colors.reply} !important;
`;
const PostContent = styled(Item.Content)`
  position: relative;
  padding: 10px 20px 0 20px !important;
`;
const PostMeta = styled(Item.Meta)`
  margin-top: 0 !important;
  color: ${secondaryColor} !important;
`;
const ThreadSubject = styled.span`
  color: mediumseagreen;
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
  margin-bottom: 30px !important;
`;
const OmittedRepliesStatus = styled(OmittedReplies)`
  position: absolute !important;
  bottom: 0;
  top: unset !important;
  left: unset !important;
  color: #b99b9b !important;
`;

interface PostContextProps {
  post: PostType;
  isOP: boolean;
}
export const PostContext = createContext<PostContextProps>(
  {} as PostContextProps
);

interface PostProps {
  post: PostType;
  isOP: boolean;
}
function Post({ post, isOP }: PostProps) {
  const board = useContext(BoardContext);
  const { thread, quotePost } = useContext(ThreadContext);

  const ThreadPost = isOP ? OriginalPost : Reply;

  return (
    <PostContext.Provider value={{ post, isOP }}>
      <ThreadPost id={post.postNumber}>
        {!isOP && <ThreadLink />}
        {post.attachment && <PostAttachment attachment={post.attachment} />}
        <PostContent>
          <PostMeta>
            {post.sage && <Sage>[SAGE]</Sage>}
            <PosterName>{post.name}</PosterName>
            {isOwnPost(post.postNumber, board.label) && (
              <OwnPost>{YOU}</OwnPost>
            )}
            {post.capcode && <Capcode>{`[${post.capcode}]`}</Capcode>}
            {post.tripcode && <Tripcode>{post.tripcode}</Tripcode>}
            {isOP && <ThreadSubject>{thread.subject}</ThreadSubject>}
            <PostTimestamp>
              {formatTimestamp(post.createdAt, true)}
            </PostTimestamp>
            <PostNumber>
              No.{" "}
              <a
                href={POST_URL(post, thread, board)}
                onClick={(e) => quotePost(e, post.postNumber)}
              >
                {post.postNumber}
              </a>
            </PostNumber>
            <PostActions />
          </PostMeta>
          <PostBody dangerouslySetInnerHTML={{ __html: post.body }} />
          {isOP && <OmittedRepliesStatus />}
        </PostContent>
      </ThreadPost>
    </PostContext.Provider>
  );
}

export default Post;
