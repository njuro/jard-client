import React, {useContext} from 'react';
import ReplyForm from './ReplyForm';
import {Button, Icon} from 'semantic-ui-react';
import {usePostApi} from '../../helpers/api';
import {JANITOR, MODERATOR, useRole} from '../../helpers/roles';
import {ThreadContext} from '../thread/Thread';
import {BoardContext} from '../board/Board';

function PostActions({post, isOP}) {
    const board = useContext(BoardContext);
    const thread = useContext(ThreadContext);

    const [, toggleSticky] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/sticky`);
    const [, toggleLock] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/lock`);
    const [, deletePost] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/delete/${post.postNumber}`);

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