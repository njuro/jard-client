import React, {useContext} from 'react';
import PostForm from './PostForm';
import {Button, Icon} from 'semantic-ui-react';
import {postApiRequest} from '../../helpers/api';
import {JANITOR, MODERATOR, useRole} from '../../helpers/roles';
import {ThreadContext} from '../thread/Thread';
import {BoardContext} from '../board/Board';
import {THREAD_URL} from '../../helpers/mappings';

function PostActions({post, isOP}) {
    const board = useContext(BoardContext);
    const {thread, onToggleSticky, onToggleLock, onDeletePost} = useContext(ThreadContext);

    function toggleSticky() {
        postApiRequest(THREAD_URL(thread, board) + '/sticky')
            .then(onToggleSticky);
    }

    function toggleLock() {
        postApiRequest(THREAD_URL(thread, board) + '/lock')
            .then(onToggleLock);
    }

    function deletePost() {
        postApiRequest(THREAD_URL(thread, board) + `/delete/${post.postNumber}`)
            .then(onDeletePost(post.postNumber));
    }

    return (
        <>
            {!thread.locked && <PostForm/>}
            {useRole(MODERATOR) && isOP && <Button basic circular size='mini'
                                                   icon={<Icon name='thumbtack'
                                                               flipped={thread.stickied ? 'vertically' : undefined}/>}
                                                   onClick={toggleSticky}/>}
            {useRole(JANITOR) && isOP && <Button basic circular size='mini'
                                                 icon={<Icon name={thread.locked ? 'open lock' : 'lock'}/>}
                                                 onClick={toggleLock}/>}
            {useRole(MODERATOR) && <Button basic circular size='mini'
                                           icon={<Icon name='alternate trash'/>}
                                           onClick={deletePost}/>}
            {isOP && thread.stickied && <Icon name='thumbtack'/>}
            {isOP && thread.locked && <Icon name='lock'/>}
        </>);
}

export default PostActions;