/* eslint-disable react/no-danger */
import React, { createContext, useContext } from "react";
import { Flag, Item, Image } from "semantic-ui-react";
import styled from "styled-components/macro";
import { FlagNameValues } from "semantic-ui-react/dist/commonjs/elements/Flag/Flag";
import { useLocation } from "react-router-dom";
import { PostType } from "../../types";
import OmittedReplies from "../thread/OmittedReplies";
import { ThreadContext } from "../thread/Thread";
import PostActions from "./PostActions";
import PostAttachment from "./PostAttachment";
import { BoardContext } from "../board/Board";
import { POST_URL, THREAD_URL } from "../../helpers/mappings";
import { formatTimestamp } from "../../helpers/utils";
import { isOwnPost, YOU } from "./ownPosts";
import { secondaryColor } from "../../helpers/theme";
import countryCodes from "../../helpers/countryCodes";
import PosterThreadId from "./PosterThreadId";

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
  max-width: 80% !important;
  word-break: break-word;

  @media screen and (min-width: 480px) {
    .content {
      padding-top: 0 !important;
  }
`;
const Reply = styled(Item)`
  width: max-content !important;
  max-width: 80% !important;
  word-break: break-word;
  padding: 0 20px 0 0 !important;
  background-color: ${(props) => props.theme.colors.reply} !important;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5) !important;

  &.highlighted {
    background-color: rgba(0, 0, 0, 0.01) !important;
  }
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
const PostContextMeta = styled.span`
  font-style: oblique;
`;
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
  embedded?: boolean;
}
function Post({ post, isOP, embedded }: PostProps) {
  const { hash } = useLocation();
  const contextBoard = useContext(BoardContext);
  const { thread: contextThread, quotePost } = useContext(ThreadContext);

  const thread = embedded && post.thread ? post.thread : contextThread;
  const board = embedded && thread.board ? thread.board : contextBoard;

  const ThreadPost = isOP ? OriginalPost : Reply;

  const PosterFlag = () => {
    if (board.settings.countryFlags) {
      if (countryCodes.includes(post.countryCode)) {
        return (
          <Flag
            name={post.countryCode as FlagNameValues}
            title={post.countryName}
          />
        );
      }
      return (
        <Image
          src="/assets/unknown-flag.png"
          style={{ display: "inline-block" }}
          title="Unknown"
        />
      );
    }
    return null;
  };

  return (
    <PostContext.Provider value={{ post, isOP }}>
      <ThreadPost
        className={`post ${
          hash === `#${post.postNumber}` ? "highlighted" : ""
        }`}
      >
        {!embedded && !isOP && <ThreadLink />}
        {post.attachment && <PostAttachment attachment={post.attachment} />}
        <PostContent>
          <PostMeta>
            {post.sage && <Sage>[SAGE]</Sage>}
            <PosterName>{post.name}</PosterName>
            {board.settings.posterThreadIds && post.posterThreadId && (
              <PosterThreadId posterId={post.posterThreadId} />
            )}
            <PosterFlag />
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
                id={String(post.postNumber)}
                href={POST_URL(post, thread, board)}
                onClick={(e) => !embedded && quotePost(e, post.postNumber)}
              >
                {post.postNumber}
              </a>
            </PostNumber>
            {!embedded && <PostActions />}
            {embedded && (
              <PostContextMeta>
                <a href={THREAD_URL(thread, board)}>
                  [Posted on /{board.label}/ - {board.name}, thread #
                  {thread.threadNumber}
                  {thread.subject && ` (${thread.subject})`}]
                </a>
              </PostContextMeta>
            )}
          </PostMeta>
          <PostBody dangerouslySetInnerHTML={{ __html: post.body }} />
          {isOP && <OmittedRepliesStatus />}
        </PostContent>
      </ThreadPost>
    </PostContext.Provider>
  );
}

export default Post;
