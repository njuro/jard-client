import React, { useContext, useState } from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";
import { ThreadContext } from "./Thread";
import { BoardContext } from "../board/Board";
import { getApiRequest } from "../../helpers/api";
import { THREAD_URL } from "../../helpers/mappings";

function ThreadUpdateButton() {
  const board = useContext(BoardContext);
  const { thread, onNewPosts } = useContext(ThreadContext);

  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState(undefined);

  function checkForNewPosts() {
    setStatus("Updating...");
    const lastPostNumber =
      thread.replies.length > 0
        ? thread.replies[thread.replies.length - 1].postNumber
        : thread.originalPost.postNumber;
    getApiRequest(
      THREAD_URL(thread, board) + `/update?lastPost=${lastPostNumber}`
    )
      .then(res => {
        setStatus(
          res.length > 0
            ? `Fetched ${res.length} new post(s)`
            : "No new replies"
        );
        onNewPosts(res);
      })
      .catch(() => setStatus("This thread was deleted"));
  }

  function toggleTimer() {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    } else {
      const handler = setInterval(checkForNewPosts, 5000);
      setTimer(handler);
    }
  }

  return (
    <>
      <Button basic size="small" onClick={checkForNewPosts}>
        <Icon name="refresh" />
        <strong>Update</strong>
      </Button>
      <Checkbox onChange={toggleTimer} label="Auto" toggle />
      <em>&nbsp; {status}</em>
    </>
  );
}

export default ThreadUpdateButton;
