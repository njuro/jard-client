import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";
import Thread from "../thread/Thread";
import ThreadCatalog from "../thread/ThreadCatalog";
import ThreadForm from "../thread/ThreadForm";
import { BoardContext } from "./Board";
import BoardHeader from "./BoardHeader";

const ThreadList = styled(Grid)`
  padding: 20px 0;
  text-align: center;
`;

function BoardCatalog(props: RouteComponentProps<{ label: string }>) {
  const label = props.match.params.label;
  const [board, setBoard] = useState<BoardType>();

  useEffect(() => {
    getApiRequest<BoardType>(`${BOARDS_URL}/${label}/catalog`).then(setBoard);
  }, [label, setBoard]);

  return (
    (board && (
      <BoardContext.Provider value={board}>
        <BoardHeader />
        <ThreadForm />
        <ThreadList container={true}>
          <ThreadList.Row columns={3}>
            {board.threads!.map(thread => (
              <ThreadCatalog
                board={board}
                thread={thread}
                key={thread.originalPost.postNumber}
              />
            ))}
          </ThreadList.Row>
        </ThreadList>
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default BoardCatalog;
