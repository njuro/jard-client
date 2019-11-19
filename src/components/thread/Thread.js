import React, {createContext} from 'react';
import {Item} from 'semantic-ui-react';
import Attachment from '../post/Attachment';
import PostActions from '../post/PostActions';

export const ThreadContext = createContext();

function Thread({thread}) {
    const isOP = (post) => post.postNumber === thread.originalPost.postNumber;

    return (
        <ThreadContext.Provider value={thread}>
            <Item.Group divided className='thread'>
                {thread.posts.map(post => (
                    <Item key={post.postNumber} className={isOP(post) ? 'original-post' : 'post'}>
                        {post.attachment && <Attachment attachment={post.attachment}/>}
                        <Item.Content>
                            <Item.Meta>
                                <span className='name'>{post.name}</span>
                                <span className='tripcode'>{post.tripcode}</span>
                                {isOP(post) && <span className='subject'>{thread.subject}</span>}
                                <span
                                    className='date'>{new Date(Date.parse(post.createdAt)).toLocaleString('sk-SK')}</span>
                                {post.attachment && <span className='file'>
                                <em>File: {post.attachment.originalFilename} ({post.attachment.width}x{post.attachment.height})</em>
                            </span>}
                                <span className='post-number'>No. {post.postNumber}</span>
                                <PostActions post={post} isOP={isOP(post)}/>
                            </Item.Meta>
                            <div className='body' dangerouslySetInnerHTML={{__html: post.body}}/>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </ThreadContext.Provider>
    );
}

export default Thread;