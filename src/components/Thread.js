import React from 'react';
import {Button, Icon, Item} from 'semantic-ui-react';
import Attachment from './Attachment';
import ReplyForm from './ReplyForm';

function Thread({thread, board}) {
    const isOP = (post) => post.postNumber === thread.originalPost.postNumber;

    return (
        <Item.Group divided className='thread'>
            {thread.posts.map(post => (
                <Item key={post.postNumber} className={isOP(post) ? 'original-post' : 'post'}>
                    {post.attachment && <Attachment attachment={post.attachment}/>}
                    <Item.Content>
                        <Item.Meta>
                            <span className='name'>{post.name}</span>
                            <span className='tripcode'>{post.tripcode}</span>
                            {isOP(post) && <span className='subject'>{thread.subject}</span>}
                            <span className='date'>{new Date(Date.parse(post.createdAt)).toLocaleString('sk-SK')}</span>
                            {post.attachment && <span className='file'>
                                <em>File: {post.attachment.originalFilename} ({post.attachment.width}x{post.attachment.height})</em>
                            </span>}
                            <span className='post-number'>No. {post.postNumber}</span>
                            {!thread.locked && <ReplyForm thread={thread} board={board}/>}
                            {isOP(post) && <Button basic circular size='mini'
                                                   icon={thread.stickied ? 'thumbtack vertically flipped' : 'thumbtack'}/>}
                            {isOP(post) &&
                            <Button basic circular size='mini' icon={thread.locked ? 'open lock' : 'lock'}/>}
                            <Button basic circular size='mini' icon='alternate trash'/>
                            {isOP(post) && thread.locked && <Icon name='thumbtack'/>}
                            {isOP(post) && thread.stickied && <Icon name='lock'/>}
                        </Item.Meta>
                        <div className='body' dangerouslySetInnerHTML={{__html: post.body}}/>
                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    );
}

export default Thread;