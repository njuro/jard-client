import React from 'react';
import Thread from './Thread';
import {useApi} from '../api';
import BoardHeader from './BoardHeader';

function ThreadWrapper(props) {
    const label = props.match.params.label;
    const threadNumber = props.match.params.threadNumber;
    const [thread] = useApi('/boards/' + label + '/' + threadNumber);
    return (
        thread &&
        <>
            <BoardHeader board={thread.board}/>
            <Thread thread={thread}/>
        </>
    ) || null;
}

export default ThreadWrapper;