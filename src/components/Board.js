import React, {useEffect} from 'react';
import {useApi} from '../api';
import {Header} from 'semantic-ui-react';
import Thread from './Thread';
import ThreadForm from './ThreadForm';


function Board(props) {
    const label = props.match.params.label;
    const [board, fetchBoard] = useApi('boards/' + label);

    useEffect(() => {
        fetchBoard('boards/' + label);
    }, [label, fetchBoard]);


    return (
        board &&
        <>
            <header>
                <Header as="h1" textAlign='center'>/{board.label}/ - {board.name}</Header>
            </header>
            <ThreadForm board={board}/>
            {board.threads.map(thread => (<Thread key={thread.originalPost.postNumber} thread={thread}/>))}
        </>
    ) || null;
}

export default Board;