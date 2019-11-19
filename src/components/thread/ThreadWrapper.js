import React from 'react';
import Thread from './Thread';
import {useGetApi} from '../../helpers/api';
import BoardHeader from '../board/BoardHeader';
import {BoardContext} from '../board/Board';

function ThreadWrapper(props) {
    const label = props.match.params.label;
    const threadNumber = props.match.params.threadNumber;
    const [thread] = useGetApi(`/boards/${label}/${threadNumber}`);

    return (
        thread &&
        <BoardContext.Provider value={thread.board}>
            <BoardHeader/>
            <Thread thread={thread}/>
        </BoardContext.Provider>
    ) || null;
}

export default ThreadWrapper;