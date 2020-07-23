import React from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import ReplyButton from "./ReplyButton";

function ThreadBottomMenu() {
  return (
    <>
      <Divider />
      <ReplyButton />
      <Button basic size="small" onClick={() => window.scrollTo(0, 0)}>
        <Icon name="arrow up" />
        <strong>Top</strong>
      </Button>
    </>
  );
}

export default ThreadBottomMenu;
