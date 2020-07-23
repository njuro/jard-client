import React, { useContext } from "react";
import { Button, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { THREAD_URL } from "../../../helpers/mappings";
import { BoardContext } from "../../board/Board";
import { ThreadContext } from "../../thread/Thread";
import { PostContext } from "../Post";

function ReplyToThreadButton() {
  const board = useContext(BoardContext);
  const { thread } = useContext(ThreadContext);
  const { isOP } = useContext(PostContext);

  const history = useHistory();

  if (
    thread.locked ||
    !isOP ||
    history.location.pathname.startsWith(THREAD_URL(thread, board))
  ) {
    return null;
  }

  return (
    <Popup
      content="Reply"
      position="top center"
      trigger={
        <Button
          basic
          circular
          size="mini"
          icon="reply"
          onClick={() => history.push(`${THREAD_URL(thread, board)}#reply`)}
        />
      }
    />
  );
}

export default ReplyToThreadButton;
