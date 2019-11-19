import React, {useContext, useEffect} from 'react';
import ReplyForm from './ReplyForm';
import {Button, Icon} from 'semantic-ui-react';
import {usePostApi} from '../../helpers/api';
import {JANITOR, MODERATOR, useRole} from '../../helpers/roles';
import {ThreadContext} from '../thread/Thread';
import {BoardContext} from '../board/Board';

function PostActions({post, isOP}) {
    const board = useContext(BoardContext);
    const {thread, setThread} = useContext(ThreadContext);

    const [stickyResponse, toggleSticky] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/sticky`, thread);
    const [lockResponse, toggleLock] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/lock`, thread);
    const [deleteResponse, deletePost] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/delete/${post.postNumber}`, thread);

    useEffect(() => {
        setThread(lockResponse);
    }, [lockResponse]);

    useEffect(() => {
        setThread(stickyResponse);
    }, [stickyResponse]);

    useEffect(() => {
        if (!deleteResponse) {
            window.location.replace(`/boards/${board.label}`);
        }

        setThread(deleteResponse);
    }, [deleteResponse]);

    return (
        <>
            {!thread.locked && <ReplyForm/>}
            {useRole(MODERATOR) && isOP && <Button basic circular size='mini'
                                                   icon={thread.stickied ? 'thumbtack vertically flipped' : 'thumbtack'}
                                                   onClick={() => toggleSticky({})}/>}
            {useRole(JANITOR) && isOP && <Button basic circular size='mini'
                                                 icon={thread.locked ? 'open lock' : 'lock'}
                                                 onClick={() => toggleLock({})}/>}
            {useRole(MODERATOR) && <Button basic circular size='mini'
                                           icon='alternate trash'
                                           onClick={() => deletePost({})}/>}
            {isOP && thread.stickied && <Icon name='thumbtack'/>}
            {isOP && thread.locked && <Icon name='lock'/>}
        </>);
}

export default PostActions;