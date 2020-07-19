import React from "react";
import {
  Icon,
  Label,
  List,
  Popup,
  Segment,
  SemanticICONS,
} from "semantic-ui-react";
import styled from "styled-components";
import {
  AttachmentCategoryNameEnum as Category,
  AttachmentType,
} from "../../types";
import getProviderStyle from "./embeddedProviders";

const AttachmentBoxWrapper = styled(Segment)`
  margin-right: 10px !important;
  margin-bottom: 10px !important;
  border: none !important;
  #attachmentLabel {
    border: none !important;
    background-color: #f8f8f8 !important;
    font-weight: normal !important;
    text-align: center !important;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :not(#attachmentLabel) {
    padding: 0 !important;
  }
`;
interface FileMetadata {
  key: string;
  value: string;
  icon: SemanticICONS;
}
interface AttachmentBoxProps {
  attachment: AttachmentType;
  children?: React.ReactNode;
}
function AttachmentBox({ attachment, children }: AttachmentBoxProps) {
  const isEmbed = attachment.category.name === Category.EMBED;

  function renderFileMetadata() {
    let items: FileMetadata[];

    if (isEmbed) {
      const { embedData } = attachment;
      const { providerIcon } = getProviderStyle(embedData.providerName);

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
            id="attachmentLabel"
            attached="top"
            style={{ cursor: "pointer" }}
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
    </AttachmentBoxWrapper>
  );
}

export default AttachmentBox;
