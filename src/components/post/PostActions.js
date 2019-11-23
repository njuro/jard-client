import React, {useContext} from 'react';
import PostForm from './PostForm';
import {Button, Icon} from 'semantic-ui-react';
import {postApiRequest} from '../../helpers/api';
import {JANITOR, MODERATOR, useRole} from '../../helpers/roles';
import {ThreadContext} from '../thread/Thread';
import {BoardContext} from '../board/Board';

function PostActions({post, isOP}) {
    const board = useContext(BoardContext);
    const {thread, onToggleSticky, onToggleLock, onDeletePost} = useContext(ThreadContext);

    function toggleSticky() {
        postApiRequest(`/boards/${board.label}/${thread.originalPost.postNumber}/sticky`)
            .then(onToggleSticky);
    }

    function toggleLock() {
        postApiRequest(`/boards/${board.label}/${thread.originalPost.postNumber}/lock`)
            .then(onToggleLock);
    }

    function deletePost() {
        postApiRequest(`/boards/${board.label}/${thread.originalPost.postNumber}/delete/${post.postNumber}`)
            .then(onDeletePost(post.postNumber));
    }

    return (
        <>
            {!thread.locked && <PostForm/>}
            {useRole(MODERATOR) && isOP && <Button basic circular size='mini'
                                                   icon={thread.stickied ? 'thumbtack vertically flipped' : 'thumbtack'}
                                                   onClick={toggleSticky}/>}
            {useRole(JANITOR) && isOP && <Button basic circular size='mini'
                                                 icon={thread.locked ? 'open lock' : 'lock'}
                                                 onClick={toggleLock}/>}
            {useRole(MODERATOR) && <Button basic circular size='mini'
                                           icon='alternate trash'
                                           onClick={deletePost}/>}
            {isOP && thread.stickied && <Icon name='thumbtack'/>}
            {isOP && thread.locked && <Icon name='lock'/>}
        </>);
}

export default PostActions;