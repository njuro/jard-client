import React, { useContext, useEffect, useMemo, useRef } from "react";
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
  const embedRef = useRef<HTMLDivElement>(null);

  const { thumbnailUrl, providerName, renderedHtml } = attachment.embedData;
  const { fileIcon, providerColor, providerIcon } = getProviderStyle(
    providerName
  );
  const renderedEmbed = useMemo(
    () => document.createRange().createContextualFragment(renderedHtml),
    [renderedHtml]
  );

  useEffect(() => {
    if (fullSize && embedRef.current) {
      embedRef.current.innerHTML = "";
      embedRef.current.appendChild(renderedEmbed);
    }
  }, [fullSize, renderedEmbed]);

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

  return <div ref={embedRef} />;
}

export default EmbeddedAttachment;
