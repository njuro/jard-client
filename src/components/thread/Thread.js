import React, {createContext} from 'react';
import {Item} from 'semantic-ui-react';
import Post from '../post/Post';

export const ThreadContext = createContext();

function Thread({thread}) {
    return (
        <ThreadContext.Provider value={thread}>
            <Item.Group divided className='thread'>
                {thread.posts.map(post => (
                    <Post key={post.postNumber} post={post} isOP={post.postNumber === thread.originalPost.postNumber}/>
                ))}
            </Item.Group>
        </ThreadContext.Provider>
    );
}

export default Thread;