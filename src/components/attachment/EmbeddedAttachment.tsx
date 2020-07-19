/* eslint-disable react/no-danger */
import React, { useContext } from "react";
import { Image } from "semantic-ui-react";
import { FileIcon } from "react-file-icon";
import { DefaultFileIconWrapper } from "./DefaultFileIcon";
import getProviderStyle from "./embeddedProviders";
import { PostAttachmentContext } from "../post/PostAttachment";

interface EmbeddedAttachmentProps {
  forceThumbnail?: boolean;
  size?: string;
}
function EmbeddedAttachment({ forceThumbnail, size }: EmbeddedAttachmentProps) {
  const { attachment, fullSize, toggleSize } = useContext(
    PostAttachmentContext
  );

  const { thumbnailUrl, providerName, renderedHtml } = attachment.embedData;
  const { fileIcon, providerColor, providerIcon } = getProviderStyle(
    providerName
  );

  if (!fullSize) {
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
