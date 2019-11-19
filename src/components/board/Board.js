import React, {createContext, useEffect} from 'react';
import {useGetApi} from '../../helpers/api';
import Thread from '../thread/Thread';
import ThreadForm from '../thread/ThreadForm';
import BoardHeader from './BoardHeader';


export const BoardContext = createContext();

function Board(props) {
    const label = props.match.params.label;
    const [board, fetchBoard] = useGetApi(`boards/${label}`);

    useEffect(() => {
        fetchBoard(`boards/${label}`);
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