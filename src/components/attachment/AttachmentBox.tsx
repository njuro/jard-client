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
import { AttachmentType } from "../../types";

const AttachmentBoxWrapper = styled(Segment)`
  margin-right: 10px !important;
  margin-bottom: 10px !important;
  border: none !important;
  .label {
    border: none !important;
    background-color: #f8f8f8 !important;
    font-weight: normal !important;
    text-align: center !important;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :not(.label) {
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
  function renderFileMetadata() {
    const { metadata } = attachment;

    const items: FileMetadata[] = [
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
        <Popup.Header>File Info</Popup.Header>
        <Popup.Content>{renderFileMetadata()}</Popup.Content>
      </Popup>

      {children}
    </AttachmentBoxWrapper>
  );
}

export default AttachmentBox;
