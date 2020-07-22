import React, { useContext } from "react";
import {
  Icon,
  Label,
  List,
  Popup,
  Segment,
  SemanticICONS,
} from "semantic-ui-react";
import styled from "styled-components/macro";
import { AttachmentCategoryNameEnum as Category } from "../../types";
import getEmbeddedProviderStyle from "./getEmbeddedProviderStyle";
import { PostAttachmentContext } from "../post/PostAttachment";
import { primaryColor, secondaryColor } from "../../helpers/theme";

const AttachmentBoxWrapper = styled(Segment)`
  margin: 0 !important;
  border: none !important;

  .attachmentBoxLabel {
    border: none !important;
    background-color: ${secondaryColor} !important;
    color: ${primaryColor} !important;
    font-weight: normal !important;
    text-align: center !important;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  :not(.attachmentBoxLabel) {
    padding: 0 !important;
  }

  #close.attachmentBoxLabel {
    font-style: normal;
    font-weight: bold !important;
    text-transform: uppercase;
    position: relative !important;
  }
`;
interface FileMetadata {
  key: string;
  value: string;
  icon: SemanticICONS;
}
interface AttachmentBoxProps {
  children?: React.ReactNode;
}
function AttachmentBox({ children }: AttachmentBoxProps) {
  const { attachment, fullSize, toggleSize } = useContext(
    PostAttachmentContext
  );

  const isEmbed = attachment.category.name === Category.EMBED;

  function renderFileMetadata() {
    let items: FileMetadata[];

    if (isEmbed) {
      const { embedData } = attachment;
      const { providerIcon } = getEmbeddedProviderStyle(embedData.providerName);

      items = [
        {
          key: "name",
          value: attachment.originalFilename,
          icon: "pencil",
        },
        {
          key: "provider",
          value: embedData.providerName,
          icon: providerIcon,
        },
        {
          key: "uploader",
          value: embedData.uploaderName,
          icon: "cloud upload",
        },
        {
          key: "embedUrl",
          value: embedData.embedUrl,
          icon: "linkify",
        },
      ];
    } else {
      const { metadata } = attachment;

      items = [
        {
          key: "name",
          value: attachment.originalFilename,
          icon: "pencil",
        },
        {
          key: "mimeType",
          value: metadata.mimeType,
          icon: "file",
        },
        {
          key: "size",
          value: metadata.fileSize,
          icon: "download",
        },
      ];

      if (metadata.duration) {
        items.push({
          key: "duration",
          value: metadata.duration,
          icon: "time",
        });
      } else if (metadata.width > 0) {
        items.push({
          key: "resolution",
          value: `${metadata.width}x${metadata.height}`,
          icon: "arrows alternate",
        });
      }

      items.push({
        key: "checksum",
        value: metadata.checksum,
        icon: "code",
      });
    }

    return (
      <List>
        {items.map((data) => (
          <List.Item key={data.key}>
            <List.Icon name={data.icon} />
            <List.Content>{data.value}</List.Content>
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <AttachmentBoxWrapper compact>
      <Popup
        position="top center"
        trigger={
          <Label
            className="attachmentBoxLabel"
            attached="top"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Icon name="info circle" style={{ float: "left" }} />
            {attachment.originalFilename}
          </Label>
        }
      >
        <Popup.Header>{isEmbed ? "Embed  Info" : "File info"}</Popup.Header>
        <Popup.Content>{renderFileMetadata()}</Popup.Content>
      </Popup>
      {children}
      {isEmbed && fullSize && (
        <Label
          className="attachmentBoxLabel"
          id="close"
          attached="bottom"
          content="[Close]"
          onClick={toggleSize}
        />
      )}
    </AttachmentBoxWrapper>
  );
}

export default AttachmentBox;
