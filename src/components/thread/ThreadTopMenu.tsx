import React from "react";
import { Button, Icon } from "semantic-ui-react";
import ReplyButton from "./ReplyButton";

function ThreadTopMenu() {
  return (
    <>
      <ReplyButton />
      <Button
        basic
        size="small"
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        <Icon name="arrow down" />
        <strong>Bottom</strong>
      </Button>
    </>
  );
}

export default ThreadTopMenu;
