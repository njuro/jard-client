import React, { SyntheticEvent, useState } from "react";
import { Image } from "semantic-ui-react";
import { ATTACHMENT_URL } from "../../helpers/mappings";
import { AttachmentType } from "../../types";
import VideoAttachment from "../attachment/VideoAttachment";
import AttachmentThumbnail from "../attachment/AttachmentThumbnail";
import AudioAttachment from "../attachment/AudioAttachment";

interface PostAttachmentProps {
  attachment: AttachmentType;
}
function PostAttachment({ attachment }: PostAttachmentProps) {
  const [showFull, setShowFull] = useState(false);

  function toggleSize(e: SyntheticEvent) {
    if (
      attachment.category.name === "PDF" ||
      attachment.category.name === "TEXT"
    ) {
      return;
    }

    e.preventDefault();
    setShowFull(!showFull);
  }

  function renderThumbnail() {
    if (attachment.category.name === "AUDIO") {
      return <AudioAttachment attachment={attachment} />;
    }

    return <AttachmentThumbnail attachment={attachment} size="250px" />;
  }

  function renderFull() {
    if (attachment.category.name === "VIDEO") {
      return (
        <VideoAttachment attachment={attachment} toggleSize={toggleSize} />
      );
    }

    return <Image verticalAlign="top" src={ATTACHMENT_URL(attachment)} />;
  }

  const RenderedImage = () => (showFull ? renderFull() : renderThumbnail());
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={ATTACHMENT_URL(attachment)}
      onClick={toggleSize}
    >
      <RenderedImage />
    </a>
  );
}

export default PostAttachment;
