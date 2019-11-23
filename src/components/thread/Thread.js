import React, {createContext, useState} from 'react';
import {Item} from 'semantic-ui-react';
import Post from '../post/Post';
import useUpdater from '../../helpers/updater';

export const ThreadContext = createContext();

function Thread({thread: initialThread}) {
    const [thread, setThread] = useState(initialThread);

    const updateThread = useUpdater();

    const isOP = (postNumber) => postNumber === thread.originalPost.postNumber;

    function onNewPosts(posts) {
        if (posts.length > 0) {
            posts.forEach(post => thread.posts.push(post));
            updateThread();
        }
    }

    function onToggleSticky() {
        thread.stickied = !thread.stickied;
        updateThread();
    }

    function onToggleLock() {
        thread.locked = !thread.locked;
        updateThread();
    }

    function onDeletePost(postNumber) {
        if (isOP(postNumber)) {
            setThread(undefined);
        } else {
            thread.posts = thread.posts.filter(post => post.postNumber !== postNumber);
            updateThread();
        }
    }

    return (
        thread &&
        <ThreadContext.Provider value={{thread, setThread, onNewPosts, onToggleSticky, onToggleLock, onDeletePost}}>
            <Item.Group divided className='thread'>
                {thread.posts.map(post => (
                    <Post key={post.postNumber} post={post} isOP={isOP(post.postNumber)}/>
                ))}
            </Item.Group>
        </ThreadContext.Provider>
    ) || <p><em>This thread was deleted</em></p>;
}

export default Thread;