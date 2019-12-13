import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import PostAttachment from "./PostAttachment";
import PostActions from "./PostActions";
import { ThreadContext } from "../thread/Thread";
import { Link } from "react-router-dom";

function Post({ post, isOP, omitted = 0, omittedAttachments = 0 }) {
  const { thread, fetchAllReplies } = useContext(ThreadContext);

  return (
    <Item className={isOP ? "original-post" : "post"}>
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
          <span className="post-number">No. {post.postNumber}</span>
          <PostActions post={post} isOP={isOP} />
        </Item.Meta>
        <div className="body" dangerouslySetInnerHTML={{ __html: post.body }} />
        {isOP && omitted > 0 && (
          <Item.Extra>
            {omitted} replies
            {omittedAttachments > 0 && ` and ${omittedAttachments} attachments`}
            &nbsp;were omitted.
            <Link to="#" onClick={fetchAllReplies}>
              &nbsp;Click here to view them
            </Link>
          </Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
}

export default Post;
