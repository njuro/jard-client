import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { ThreadContext } from "./Thread";

function ReplyButton() {
  const { setReplyFormOpen } = useContext(ThreadContext);

  return (
    <Button basic size="small" onClick={() => setReplyFormOpen(true)}>
      <Icon name="plus" />
      <strong>New reply</strong>
    </Button>
  );
}

export default ReplyButton;
