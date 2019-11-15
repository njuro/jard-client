import React from 'react';
import ReplyForm from './ReplyForm';
import {Button, Icon} from 'semantic-ui-react';
import {usePostApi} from '../api';

function PostActions({thread, board, post, isOP}) {
    const [, toggleSticky] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/sticky`);
    const [, toggleLock] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/lock`);
    const [, deletePost] = usePostApi(`/boards/${board.label}/${thread.originalPost.postNumber}/delete/${post.postNumber}`);

    return (
        <>
            {!thread.locked && <ReplyForm thread={thread} board={board}/>}
            {isOP && <Button basic circular size='mini'
                             icon={thread.stickied ? 'thumbtack vertically flipped' : 'thumbtack'}
                             onClick={() => toggleSticky({})}/>}
            {isOP && <Button basic circular size='mini'
                             icon={thread.locked ? 'open lock' : 'lock'}
                             onClick={() => toggleLock({})}/>}
            <Button basic circular size='mini'
                    icon='alternate trash'
                    onClick={() => deletePost({})}/>
            {isOP && thread.locked && <Icon name='thumbtack'/>}
            {isOP && thread.stickied && <Icon name='lock'/>}
        </>);
}

export default PostActions;