/* eslint-disable react/no-danger */
import React from "react";
import { Image } from "semantic-ui-react";
import { FileIcon, IconType } from "react-file-icon";
import {
  AttachmentCategoryNameEnum as Category,
  AttachmentType,
} from "../../types";
import { DefaultFileIconWrapper } from "./DefaultFileIcon";

const iconTypes: Record<Category, IconType> = {
  [Category.IMAGE]: "image",
  [Category.AUDIO]: "audio",
  [Category.VIDEO]: "video",
  [Category.TEXT]: "document",
  [Category.PDF]: "acrobat",
  [Category.EMBED]: "binary",
};
interface EmbeddedAttachmentProps {
  attachment: AttachmentType;
  thumbnail?: boolean;
  size?: string;
}
function EmbeddedAttachment({
  attachment,
  thumbnail,
  size,
}: EmbeddedAttachmentProps) {
  if (thumbnail) {
    const { thumbnailUrl, category, providerName } = attachment.embedData;
    if (thumbnailUrl) {
      return <Image verticalAlign="top" src={thumbnailUrl} />;
    }
    return (
      <DefaultFileIconWrapper size={size ?? "auto"}>
        <FileIcon
          labelUppercase={false}
          type={iconTypes[category]}
          extension={providerName}
        />
      </DefaultFileIconWrapper>
    );
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: attachment.embedData.renderedHtml,
      }}
    />
  );
}

export default EmbeddedAttachment;
