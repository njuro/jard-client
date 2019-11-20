import React, {createContext, useState} from 'react';
import {Item} from 'semantic-ui-react';
import Post from '../post/Post';
import useUpdater from '../../helpers/updater';

export const ThreadContext = createContext();

function Thread({thread: initialThread}) {
    const [thread, setThread] = useState(initialThread);
    const updateThread = useUpdater();

    function appendPosts(posts) {
        for (const post of posts) {
            thread.posts.push(post);
        }

        updateThread();
    }

    return (
        <ThreadContext.Provider value={{thread, setThread, appendPosts}}>
            <Item.Group divided className='thread'>
                {thread.posts.map(post => (
                    <Post key={post.postNumber} post={post} isOP={post.postNumber === thread.originalPost.postNumber}/>
                ))}
            </Item.Group>
        </ThreadContext.Provider>
    );
}

export default Thread;