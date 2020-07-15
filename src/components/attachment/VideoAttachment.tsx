import React, { SyntheticEvent } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { AttachmentType } from "../../types";
import { ATTACHMENT_URL } from "../../helpers/mappings";

const VideoCloseIcon = styled(Icon)`
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
`;

interface VideoAttachmentProps {
  attachment: AttachmentType;
  toggleSize: (event: SyntheticEvent) => void;
}
function VideoAttachment({ attachment, toggleSize }: VideoAttachmentProps) {
  return (
    <div style={{ position: "relative" }}>
      <VideoCloseIcon link name="close" s size="big" onClick={toggleSize} />
      <video src={ATTACHMENT_URL(attachment)} controls loop autoPlay />
    </div>
  );
}

export default VideoAttachment;
