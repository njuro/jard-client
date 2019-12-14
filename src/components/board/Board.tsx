import React, { createContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL } from "../../helpers/mappings";
import { BoardType } from "../../types";
import Thread from "../thread/Thread";
import ThreadForm from "../thread/ThreadForm";
import BoardHeader from "./BoardHeader";

export const BoardContext = createContext<BoardType>({} as BoardType);

function Board(props: RouteComponentProps<{ label: string }>) {
  const label = props.match.params.label;
  const [board, setBoard] = useState<BoardType>();

  useEffect(() => {
    getApiRequest<BoardType>(`${BOARDS_URL}/${label}`).then(setBoard);
  }, [label, setBoard]);

  return (
    (board && (
      <BoardContext.Provider value={board}>
        <BoardHeader />
        <ThreadForm />
        {board.threads!.map(thread => (
          <Thread key={thread.originalPost.postNumber} thread={thread} />
        ))}
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default Board;
