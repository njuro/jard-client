import React, {useContext, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {ThreadContext} from './Thread';
import {BoardContext} from '../board/Board';
import {getApiRequest} from '../../helpers/api';

function ThreadUpdateButton() {
    const [status, setStatus] = useState('');
    const board = useContext(BoardContext);
    const {thread, onNewPosts} = useContext(ThreadContext);

    function checkForNewPosts() {
        setStatus('Updating...');
        const lastPostNumber = thread.posts[thread.posts.length - 1].postNumber;
        getApiRequest(`/boards/${board.label}/${thread.originalPost.postNumber}/update?lastPost=${lastPostNumber}`)
            .then(res => {
                setStatus(res.length > 0 ? `Fetched ${res.length} new post(s)` : 'No new posts');
                onNewPosts(res);
            });
    }

    return (
        <>
            <Button basic size='small' onClick={checkForNewPosts}><Icon name='refresh'/><strong>Update</strong></Button>
            <em>&nbsp; {status}</em>
        </>
    );
}

export default ThreadUpdateButton;