import React, { useContext } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { ThreadContext } from "../thread/Thread";
import ReplyToThreadButton from "./actions/ReplyToThreadButton";
import ToggleStickyButton from "./actions/ToggleStickyButton";
import ToggleLockButton from "./actions/ToggleLockButton";
import DeletePostButton from "./actions/DeletePostButton";
import CreateBanButton from "./actions/CreateBanButton";
import { PostContext } from "./Post";

function PostActions() {
  const { thread } = useContext(ThreadContext);
  const { isOP } = useContext(PostContext);

  return (
    <>
      <ReplyToThreadButton />
      <ToggleStickyButton />
      <ToggleLockButton />
      <DeletePostButton />
      <CreateBanButton />
      {isOP && thread.stickied && (
        <Popup
          content="Stickied"
          position="top center"
          trigger={<Icon name="thumbtack" />}
        />
      )}
      {isOP && thread.locked && (
        <Popup
          content="Locked"
          position="top center"
          trigger={<Icon name="lock" />}
        />
      )}
    </>
  );
}

export default PostActions;
