import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import { AttachmentType } from "../../types";
import { ATTACHMENT_THUMB_URL, ATTACHMENT_URL } from "../../helpers/mappings";

interface PostAttachmentProps {
  attachment: AttachmentType;
}
function PostAttachment({ attachment }: PostAttachmentProps) {
  const [showFull, setShowFull] = useState(false);

  function toggleSize(e: Event) {
    e.preventDefault();
    setShowFull(!showFull);
  }

  return (
    <Image
      href={ATTACHMENT_URL(attachment)}
      target="_blank"
      rel="noopener noreferrer"
      verticalAlign="top"
      src={
        showFull ? ATTACHMENT_URL(attachment) : ATTACHMENT_THUMB_URL(attachment)
      }
      onClick={toggleSize}
    />
  );
}

export default PostAttachment;
