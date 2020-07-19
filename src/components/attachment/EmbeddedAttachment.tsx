/* eslint-disable react/no-danger */
import React, { SyntheticEvent } from "react";
import { Image } from "semantic-ui-react";
import { FileIcon } from "react-file-icon";
import { AttachmentType } from "../../types";
import { DefaultFileIconWrapper } from "./DefaultFileIcon";
import getProviderStyle from "./embeddedProviders";

interface EmbeddedAttachmentProps {
  attachment: AttachmentType;
  thumbnail?: boolean;
  forceThumbnail?: boolean;
  size?: string;
  toggleSize?: (event: SyntheticEvent) => void;
}
function EmbeddedAttachment({
  attachment,
  thumbnail,
  forceThumbnail,
  size,
  toggleSize,
}: EmbeddedAttachmentProps) {
  const { thumbnailUrl, providerName, renderedHtml } = attachment.embedData;
  const { fileIcon, providerColor, providerIcon } = getProviderStyle(
    providerName
  );

  if (thumbnail) {
    if (thumbnailUrl) {
      return (
        <Image
          label={{
            color: providerColor,
            content: providerName,
            ribbon: true,
            icon: providerIcon,
          }}
          verticalAlign="top"
          src={thumbnailUrl}
          onClick={toggleSize}
          style={{ cursor: "pointer", width: "250px" }}
        />
      );
    }

    if (forceThumbnail) {
      return (
        <DefaultFileIconWrapper size={size ?? "auto"}>
          <FileIcon
            labelUppercase={false}
            type={fileIcon}
            extension={providerName}
          />
        </DefaultFileIconWrapper>
      );
    }
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: renderedHtml,
      }}
    />
  );
}

export default EmbeddedAttachment;
