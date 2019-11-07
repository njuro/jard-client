import React, {useEffect, useState} from 'react';
import API from '../api';
import {Header} from 'semantic-ui-react';
import Thread from './Thread';


function Board(props) {
    const label = props.match.params.label;
    const [board, setBoard] = useState(undefined);

    useEffect(() => {
        async function fetchBoard() {
            const response = await API.get('boards/' + label);
            setBoard(response.data);
        }

        fetchBoard();
    }, [label]);

    return (
        board &&
        <>
            <Header as="h1">/{board.label}/ - {board.name}</Header>
            {board.threads.map(thread => (<Thread key={thread.originalPost.postNumber} thread={thread}/>))}
        </>
    ) || null;
}

export default Board;