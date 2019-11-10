import React, {useEffect} from 'react';
import {useApi} from '../api';
import Thread from './Thread';
import ThreadForm from './ThreadForm';
import BoardHeader from './BoardHeader';


function Board(props) {
    const label = props.match.params.label;
    const [board, fetchBoard] = useApi('boards/' + label);

    useEffect(() => {
        fetchBoard('boards/' + label);
    }, [label, fetchBoard]);


    return (
        board &&
        <>
            <BoardHeader board={board}/>
            <ThreadForm board={board}/>
            {board.threads.map(thread => (
                <Thread key={thread.originalPost.postNumber} thread={thread} board={board}/>))}
        </>
    ) || null;
}

export default Board;