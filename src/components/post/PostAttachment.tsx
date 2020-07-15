import React, { SyntheticEvent, useState } from "react";
import { Image } from "semantic-ui-react";
import { ATTACHMENT_URL } from "../../helpers/mappings";
import {
  AttachmentCategoryNameEnum as Category,
  AttachmentType,
} from "../../types";
import VideoAttachment from "../attachment/VideoAttachment";
import AttachmentThumbnail from "../attachment/AttachmentThumbnail";
import AudioAttachment from "../attachment/AudioAttachment";

interface PostAttachmentProps {
  attachment: AttachmentType;
}
function PostAttachment({ attachment }: PostAttachmentProps) {
  const [showFull, setShowFull] = useState(false);
  const category = attachment.category.name;

  function toggleSize(e: SyntheticEvent) {
    e.preventDefault();
    setShowFull(!showFull);
  }

  function renderThumbnail() {
    if (category === Category.AUDIO) {
      return <AudioAttachment attachment={attachment} />;
    }

    return <AttachmentThumbnail attachment={attachment} size="250px" />;
  }

  function renderFull() {
    if (category === Category.VIDEO) {
      return (
        <VideoAttachment attachment={attachment} toggleSize={toggleSize} />
      );
    }

    return <Image verticalAlign="top" src={ATTACHMENT_URL(attachment)} />;
  }

  const RenderedLink: React.FC = ({ children }) => {
    if (category === Category.AUDIO) {
      return <>{children}</>;
    }

    const onClick =
      category === Category.PDF || category === Category.TEXT
        ? undefined
        : toggleSize;

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={ATTACHMENT_URL(attachment)}
        onClick={onClick}
      >
        {children}
      </a>
    );
  };
  const RenderedImage = () => (showFull ? renderFull() : renderThumbnail());

  return (
    <RenderedLink>
      <div style={{ marginRight: "10px" }}>
        <RenderedImage />
      </div>
    </RenderedLink>
  );
}

export default PostAttachment;
