import React, {useContext, useState} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {ThreadContext} from './Thread';
import {BoardContext} from '../board/Board';
import {getApiRequest} from '../../helpers/api';
import {THREAD_URL} from '../../helpers/mappings';

function ThreadUpdateButton() {
    const board = useContext(BoardContext);
    const {thread, onNewPosts} = useContext(ThreadContext);

    const [status, setStatus] = useState('');

    function checkForNewPosts() {
        setStatus('Updating...');
        const lastPostNumber = thread.posts[thread.posts.length - 1].postNumber;
        getApiRequest(THREAD_URL(thread, board) + `/update?lastPost=${lastPostNumber}`)
            .then(res => {
                setStatus(res.length > 0 ? `Fetched ${res.length} new post(s)` : 'No new posts');
                onNewPosts(res);
            })
            .catch(() => setStatus('This thread was deleted'));
    }

    return (
        <>
            <Button basic size='small' onClick={checkForNewPosts}><Icon name='refresh'/><strong>Update</strong></Button>
            <em>&nbsp; {status}</em>
        </>
    );
}

export default ThreadUpdateButton;