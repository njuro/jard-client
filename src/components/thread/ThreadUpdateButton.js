import React, {useContext} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {ThreadContext} from './Thread';
import {BoardContext} from '../board/Board';
import {getApiRequest} from '../../helpers/api';

function ThreadUpdateButton() {
    const board = useContext(BoardContext);
    const {thread, onNewPosts} = useContext(ThreadContext);

    function checkForNewPosts() {
        const lastPostNumber = thread.posts[thread.posts.length - 1].postNumber;
        getApiRequest(`/boards/${board.label}/${thread.originalPost.postNumber}/update?lastPost=${lastPostNumber}`)
            .then(onNewPosts);
    }

    return (
        <Button basic size='small' onClick={checkForNewPosts}><Icon name='refresh'/><strong>Update</strong></Button>
    );
}

export default ThreadUpdateButton;