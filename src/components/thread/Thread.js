import React, {createContext, useState} from 'react';
import {Item} from 'semantic-ui-react';
import Post from '../post/Post';

export const ThreadContext = createContext();

function Thread({thread: initialThread}) {
    const [thread, setThread] = useState(initialThread);

    return (
        <ThreadContext.Provider value={{thread, setThread}}>
            <Item.Group divided className='thread'>
                {thread.posts.map(post => (
                    <Post key={post.postNumber} post={post} isOP={post.postNumber === thread.originalPost.postNumber}/>
                ))}
            </Item.Group>
        </ThreadContext.Provider>
    );
}

export default Thread;