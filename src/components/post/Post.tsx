import React, { SyntheticEvent, useContext } from "react";
import { Item } from "semantic-ui-react";
import { PostType } from "../../types";
import OmittedReplies from "../thread/OmittedReplies";
import { ThreadContext } from "../thread/Thread";
import PostActions from "./PostActions";
import PostAttachment from "./PostAttachment";
import { BoardContext } from "../board/Board";
import { POST_URL } from "../../helpers/mappings";

interface PostProps {
  post: PostType;
  isOP: boolean;
}
function Post({ post, isOP }: PostProps) {
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

  return (
    <Item className={isOP ? "original-post" : "post"} id={post.postNumber}>
      {post.attachment && <PostAttachment attachment={post.attachment} />}
      <Item.Content>
        <Item.Meta>
          <span className="name">{post.name}</span>
          <span className="tripcode">{post.tripcode}</span>
          {isOP && <span className="subject">{thread.subject}</span>}
          <span className="date">
            {new Date(Date.parse(post.createdAt)).toLocaleString("sk-SK")}
          </span>
          {post.attachment && (
            <span className="file">
              <em>
                File: {post.attachment.originalFilename} (
                {post.attachment.width}x{post.attachment.height})
              </em>
            </span>
          )}
          <span className="post-number">
            No.{" "}
            <a href={POST_URL(post, thread, board)} onClick={quotePost}>
              {post.postNumber}
            </a>
          </span>
          <PostActions post={post} isOP={isOP} />
        </Item.Meta>
        <div className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
        {isOP && <OmittedReplies />}
      </Item.Content>
    </Item>
  );
}

export default Post;
