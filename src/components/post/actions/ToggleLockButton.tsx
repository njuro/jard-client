import React, { useContext } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import { BoardContext } from "../../board/Board";
import { ThreadContext } from "../../thread/Thread";
import { postApiRequest } from "../../../helpers/api";
import { THREAD_URL } from "../../../helpers/mappings";
import useAuthority from "../../../helpers/useAuthority";
import { UserAuthority } from "../../../types";
import { PostContext } from "../Post";

function ToggleLockButton() {
  const board = useContext(BoardContext);
  const { thread, refreshThread } = useContext(ThreadContext);
  const { isOP } = useContext(PostContext);

  function toggleLock() {
    postApiRequest(`${THREAD_URL(thread, board)}/lock`).then(() => {
      thread.locked = !thread.locked;
      refreshThread();
    });
  }

  if (!useAuthority(UserAuthority.TOGGLE_LOCK_THREAD) || !isOP) {
    return null;
  }

  return (
    <Popup
      content={thread.locked ? "Unlock" : "Lock"}
      position="top center"
      trigger={
        <Button
          basic
          circular
          size="mini"
          icon={<Icon name={thread.locked ? "lock open" : "lock"} />}
          onClick={toggleLock}
        />
      }
    />
  );
}

export default ToggleLockButton;
