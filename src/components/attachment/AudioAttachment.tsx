import React from "react";
import { renderToString } from "react-dom/server";
import { AttachmentType } from "../../types";
import { ATTACHMENT_URL } from "../../helpers/mappings";
import DefaultFileIcon, { DefaultFileIconWrapper } from "./DefaultFileIcon";

interface AudioAttachmentProps {
  attachment: AttachmentType;
}
function AudioAttachment({ attachment }: AudioAttachmentProps) {
  const icon = <DefaultFileIcon filename={attachment.filename} />;
  const svg = `data:image/svg+xml;utf8,${encodeURIComponent(
    renderToString(icon)
  )}`;

  return (
    <DefaultFileIconWrapper size="250px">
      <video src={ATTACHMENT_URL(attachment)} poster={svg} controls loop />
    </DefaultFileIconWrapper>
  );
}

export default AudioAttachment;
