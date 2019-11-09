import React from 'react';
import {Header} from 'semantic-ui-react';

function BoardHeader({board}) {
    return (
        <header>
            <Header as="h1" textAlign='center'>/{board.label}/ - {board.name}</Header>
        </header>
    );
}

export default BoardHeader;