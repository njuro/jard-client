import React, { useContext } from "react";
import { renderToString } from "react-dom/server";
import { ATTACHMENT_URL } from "../../helpers/mappings";
import DefaultFileIcon, { DefaultFileIconWrapper } from "./DefaultFileIcon";
import { PostAttachmentContext } from "../post/PostAttachment";

function AudioAttachment() {
  const { attachment } = useContext(PostAttachmentContext);

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
