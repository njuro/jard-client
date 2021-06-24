import React, { useContext } from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import { apiErrorHandler, patchApiRequest } from "../../../helpers/api";
import { THREAD_URL } from "../../../helpers/mappings";
import { BoardContext } from "../../board/Board";
import { ThreadContext } from "../../thread/Thread";
import useAuthority from "../../../helpers/useAuthority";
import { UserAuthority } from "../../../types";
import { PostContext } from "../Post";

function ToggleStickyButton() {
  const board = useContext(BoardContext);
  const { thread, refreshThread } = useContext(ThreadContext);
  const { isOP } = useContext(PostContext);

  function toggleSticky() {
    patchApiRequest(`${THREAD_URL(thread, board)}/sticky`)
      .then(() => {
        thread.stickied = !thread.stickied;
        refreshThread();
      })
      .catch(apiErrorHandler);
  }

  if (!useAuthority(UserAuthority.TOGGLE_STICKY_THREAD) || !isOP) {
    return null;
  }

  return (
    <Popup
      content={thread.stickied ? "Unsticky" : "Sticky"}
      position="top center"
      trigger={
        <Button
          basic
          circular
          size="mini"
          icon={
            <Icon
              name="thumbtack"
              flipped={thread.stickied ? "vertically" : undefined}
            />
          }
          onClick={toggleSticky}
        />
      }
    />
  );
}

export default ToggleStickyButton;
