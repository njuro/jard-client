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
  padding: 0 !important;
  border: none !important;
  .label {
    border: none !important;
    background-color: #f8f8f8 !important;
    font-weight: normal !important;
    text-align: center !important;
    font-style: italic;
  }
`;
interface FileMetadata {
  description: string;
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
        description: "MIME type",
        value: metadata.mimeType,
        icon: "file",
      },
      {
        description: "Size",
        value: metadata.fileSize,
        icon: "download",
      },
    ];

    if (metadata.duration) {
      items.push({
        description: "Duration",
        value: metadata.duration,
        icon: "time",
      });
    } else if (metadata.width > 0) {
      items.push({
        description: "Resolution",
        value: `${metadata.width}x${metadata.height}`,
        icon: "arrows alternate",
      });
    }

    items.push({
      description: "Checksum",
      value: metadata.checksum,
      icon: "code",
    });

    return (
      <List>
        {items.map((data) => (
          <List.Item key={data.description}>
            <List.Icon name={data.icon} />
            <List.Content>{data.value}</List.Content>
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <AttachmentBoxWrapper>
      <Popup
        header="File info"
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
        <Popup.Content>{renderFileMetadata()}</Popup.Content>
      </Popup>

      {children}
    </AttachmentBoxWrapper>
  );
}

export default AttachmentBox;
