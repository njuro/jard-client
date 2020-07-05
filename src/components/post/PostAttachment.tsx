import React, { ReactElement, SyntheticEvent, useState } from "react";
import { Image } from "semantic-ui-react";
import FileIcon, { DefaultExtensionType, defaultStyles } from "react-file-icon";
import { Link } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { render } from "react-dom";
import styled from "styled-components";
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

  function renderSvg(fileIcon: ReactElement) {
    let svg = renderToString(fileIcon);
    svg = `${svg.substring(
      0,
      4
    )} xmlns="http://www.w3.org/2000/svg"${svg.substring(4)}`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function renderThumbnail() {
    if (!attachment.category.hasThumbnail) {
      const ext = attachment.filename.split(".").pop();
      const fileIcon = (
        <FileIcon
          size={250}
          labelUppercase
          extension={ext!}
          {...defaultStyles[ext as DefaultExtensionType]}
        />
      );
      if (attachment.category.name === "AUDIO") {
        return (
          <video
            src={ATTACHMENT_URL(attachment)}
            poster={renderSvg(fileIcon)}
            controls
            loop
          />
        );
      }

      return (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={ATTACHMENT_URL(attachment)}
        >
          {fileIcon}
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
        onClick={attachment.category.name === "PDF" || toggleSize}
      />
    );
  }

  function renderFull() {
    if (attachment.category.name === "VIDEO") {
      return <video src={ATTACHMENT_URL(attachment)} controls loop autoPlay />;
    }

    if (attachment.category.name === "AUDIO") {
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
