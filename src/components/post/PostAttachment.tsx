import React, { SyntheticEvent, useState } from "react";
import { Image } from "semantic-ui-react";
import FileIcon, { DefaultExtensionType, defaultStyles } from "react-file-icon";
import { Link } from "react-router-dom";
import { ATTACHMENT_THUMB_URL, ATTACHMENT_URL } from "../../helpers/mappings";
import { AttachmentType } from "../../types";

interface PostAttachmentProps {
  attachment: AttachmentType;
}
function PostAttachment({ attachment }: PostAttachmentProps) {
  const [showFull, setShowFull] = useState(false);

  function toggleSize(e: SyntheticEvent) {
    e.preventDefault();
    setShowFull(!showFull);
  }

  function renderThumbnail() {
    if (!attachment.type.hasThumbnail) {
      const ext = attachment.filename.split(".").pop();
      return (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={ATTACHMENT_URL(attachment)}
          onClick={(e) => {
            if (attachment.type.name === "AUDIO") {
              toggleSize(e);
            }
          }}
        >
          <FileIcon
            size={250}
            labelUppercase
            extension={ext!}
            {...defaultStyles[ext as DefaultExtensionType]}
          />
        </Link>
      );
    }

    return (
      <Image
        href={ATTACHMENT_URL(attachment)}
        target="_blank"
        rel="noopener noreferrer"
        verticalAlign="top"
        src={ATTACHMENT_THUMB_URL(attachment)}
        onClick={attachment.type.name === "PDF" || toggleSize}
      />
    );
  }

  function renderFull() {
    if (attachment.type.name === "VIDEO") {
      // eslint-disable-next-line jsx-a11y/media-has-caption
      return <video src={ATTACHMENT_URL(attachment)} controls loop autoPlay />;
    }

    if (attachment.type.name === "AUDIO") {
      // eslint-disable-next-line jsx-a11y/media-has-caption
      return <audio src={ATTACHMENT_URL(attachment)} controls loop autoPlay />;
    }

    return (
      <Image
        href={ATTACHMENT_URL(attachment)}
        target="_blank"
        rel="noopener noreferrer"
        verticalAlign="top"
        src={ATTACHMENT_URL(attachment)}
        onClick={toggleSize}
      />
    );
  }

  return showFull ? renderFull() : renderThumbnail();
}

export default PostAttachment;
