import React, {useEffect, useState} from 'react';
import Thread from './Thread';
import {getApiRequest} from '../../helpers/api';
import BoardHeader from '../board/BoardHeader';
import {BoardContext} from '../board/Board';
import {BOARDS_URL} from '../../helpers/mappings';

function ThreadWrapper(props) {
    const label = props.match.params.label;
    const threadNumber = props.match.params.threadNumber;

    const [thread, setThread] = useState(undefined);

    useEffect(() => {
        getApiRequest(`${BOARDS_URL}/${label}/${threadNumber}`).then(setThread);
    }, [label, threadNumber]);

    return (
        thread &&
        <BoardContext.Provider value={thread.board}>
            <BoardHeader/>
            <Thread thread={thread}/>
        </BoardContext.Provider>
    ) || null;
}

export default ThreadWrapper;