import React, {useContext, useState} from 'react';
import {Item} from 'semantic-ui-react';
import Attachment from './Attachment';
import PostActions from './PostActions';
import {ThreadContext} from '../thread/Thread';

function Post({post: initialPost, isOP}) {
    const [post, setPost] = useState(initialPost);
    const thread = useContext(ThreadContext);

    return (
        <Item className={isOP ? 'original-post' : 'post'}>
            {post.attachment && <Attachment attachment={post.attachment}/>}
            <Item.Content>
                <Item.Meta>
                    <span className='name'>{post.name}</span>
                    <span className='tripcode'>{post.tripcode}</span>
                    {isOP && <span className='subject'>{thread.subject}</span>}
                    <span
                        className='date'>{new Date(Date.parse(post.createdAt)).toLocaleString('sk-SK')}</span>
                    {post.attachment && <span className='file'>
                                <em>File: {post.attachment.originalFilename} ({post.attachment.width}x{post.attachment.height})</em>
                            </span>}
                    <span className='post-number'>No. {post.postNumber}</span>
                    <PostActions post={post} renderPost={setPost} isOP={isOP}/>
                </Item.Meta>
                <div className='body' dangerouslySetInnerHTML={{__html: post.body}}/>
            </Item.Content>
        </Item>
    );
}

export default Post;