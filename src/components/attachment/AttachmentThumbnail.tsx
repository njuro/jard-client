import React from "react";
import { Image } from "semantic-ui-react";
import { AttachmentCategoryNameEnum, AttachmentType } from "../../types";
import { ATTACHMENT_THUMB_URL } from "../../helpers/mappings";
import DefaultFileIcon, { DefaultFileIconWrapper } from "./DefaultFileIcon";
import EmbeddedAttachment from "./EmbeddedAttachment";

interface AttachmentThumbnailProps {
  attachment: AttachmentType;
  size?: string;
}
function AttachmentThumbnail({ attachment, size }: AttachmentThumbnailProps) {
  if (attachment.category.name === AttachmentCategoryNameEnum.EMBED) {
    return <EmbeddedAttachment attachment={attachment} thumbnail size={size} />;
  }

  if (!attachment.category.hasThumbnail) {
    return (
      <DefaultFileIconWrapper size={size ?? "auto"}>
        <DefaultFileIcon filename={attachment.filename} />
      </DefaultFileIconWrapper>
    );
  }

  return <Image verticalAlign="top" src={ATTACHMENT_THUMB_URL(attachment)} />;
}

export default AttachmentThumbnail;
