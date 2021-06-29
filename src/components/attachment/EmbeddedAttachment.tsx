import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Image } from "semantic-ui-react";
import { FileIcon } from "react-file-icon";
import styled from "styled-components/macro";
import { DefaultFileIconWrapper } from "./DefaultFileIcon";
import getEmbeddedProviderStyle from "./getEmbeddedProviderStyle";
import { PostAttachmentContext } from "../post/PostAttachment";
import { AttachmentType } from "../../types";

export const EmbeddedContainer = styled.div`
  iframe.embedly-card {
    background-color: whitesmoke !important;
  }
`;

interface EmbeddedAttachmentProps {
  size?: string;
  attachment?: AttachmentType;
}
function EmbeddedAttachment({
  size,
  attachment: propAttachment,
}: EmbeddedAttachmentProps) {
  const {
    attachment: contextAttachment,
    fullSize,
    toggleSize,
  } = useContext(PostAttachmentContext);
  const embedRef = useRef<HTMLDivElement>(null);

  const attachment = propAttachment ?? contextAttachment;
  const { thumbnailUrl, providerName, renderedHtml } = attachment.embedData;
  const { fileIcon, providerColor, providerIcon, thumbnailPlaceholderUrl } =
    getEmbeddedProviderStyle(providerName);
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
    if (thumbnailUrl || thumbnailPlaceholderUrl) {
      return (
        <Image
          label={{
            color: providerColor,
            content: providerName,
            ribbon: true,
            icon: providerIcon,
          }}
          verticalAlign="top"
          src={thumbnailUrl ?? thumbnailPlaceholderUrl}
          onClick={toggleSize}
          style={{ cursor: "pointer", width: "250px" }}
        />
      );
    }

    return (
      <DefaultFileIconWrapper
        size={size ?? "auto"}
        style={{ cursor: "pointer" }}
        onClick={toggleSize}
      >
        <FileIcon
          labelUppercase={false}
          type={fileIcon}
          extension={providerName}
        />
      </DefaultFileIconWrapper>
    );
  }

  return <EmbeddedContainer ref={embedRef} />;
}

export default EmbeddedAttachment;
