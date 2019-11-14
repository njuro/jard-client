import React from 'react';
import Thread from './Thread';
import {useGetApi} from '../api';
import BoardHeader from './BoardHeader';

function ThreadWrapper(props) {
    const label = props.match.params.label;
    const threadNumber = props.match.params.threadNumber;
    const [thread] = useGetApi('/boards/' + label + '/' + threadNumber);
    return (
        thread &&
        <>
            <BoardHeader board={thread.board}/>
            <Thread thread={thread} board={thread.board}/>
        </>
    ) || null;
}

export default ThreadWrapper;