import React, {useEffect} from 'react';
import {useApi} from '../api';
import {Header} from 'semantic-ui-react';
import Thread from './Thread';


function Board(props) {
    const label = props.match.params.label;
    const [board, fetchBoard] = useApi('boards/' + label);

    useEffect(() => {
        fetchBoard('boards/' + label);
    }, [label, fetchBoard]);


    return (
        board &&
        <>
            <Header as="h1">/{board.label}/ - {board.name}</Header>
            {board.threads.map(thread => (<Thread key={thread.originalPost.postNumber} thread={thread}/>))}
        </>
    ) || null;
}

export default Board;