import React, { useContext } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { ATTACHMENT_URL } from "../../helpers/mappings";
import { PostAttachmentContext } from "../post/PostAttachment";

const VideoCloseIcon = styled(Icon)`
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
`;
function VideoAttachment() {
  const { attachment, toggleSize } = useContext(PostAttachmentContext);

  return (
    <div style={{ position: "relative" }}>
      <VideoCloseIcon link name="close" size="big" onClick={toggleSize} />
      <video src={ATTACHMENT_URL(attachment)} controls loop autoPlay />
    </div>
  );
}

export default VideoAttachment;
