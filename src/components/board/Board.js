import React, {createContext, useEffect, useState} from 'react';
import {getApiRequest} from '../../helpers/api';
import Thread from '../thread/Thread';
import ThreadForm from '../thread/ThreadForm';
import BoardHeader from './BoardHeader';
import {BOARDS_URL} from '../../helpers/mappings';


export const BoardContext = createContext();

function Board(props) {
    const label = props.match.params.label;
    const [board, setBoard] = useState(undefined);

    useEffect(() => {
        getApiRequest(`${BOARDS_URL}/${label}`).then(setBoard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [label]);


    return (
        board && <BoardContext.Provider value={board}>
            <BoardHeader/>
            <ThreadForm/>
            {board.threads.map(thread => (
                <Thread key={thread.originalPost.postNumber} thread={thread}/>))}
        </BoardContext.Provider>
    ) || null;
}

export default Board;