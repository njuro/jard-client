import React, { createContext, SyntheticEvent, useState } from "react";
import { Image } from "semantic-ui-react";
import { ATTACHMENT_URL } from "../../helpers/mappings";
import {
  AttachmentCategoryNameEnum as Category,
  AttachmentType,
} from "../../types";
import VideoAttachment from "../attachment/VideoAttachment";
import AttachmentThumbnail from "../attachment/AttachmentThumbnail";
import AudioAttachment from "../attachment/AudioAttachment";
import AttachmentBox from "../attachment/AttachmentBox";
import EmbeddedAttachment from "../attachment/EmbeddedAttachment";

interface PostAttachmentContextProps {
  attachment: AttachmentType;
  fullSize: boolean;
  toggleSize: (event: SyntheticEvent) => void;
}
export const PostAttachmentContext = createContext<PostAttachmentContextProps>(
  {} as PostAttachmentContextProps
);

interface PostAttachmentProps {
  attachment: AttachmentType;
}
function PostAttachment({ attachment }: PostAttachmentProps) {
  const [fullSize, setFullSize] = useState(false);
  const category = attachment.category.name;

  function toggleSize(e: SyntheticEvent) {
    e.preventDefault();
    setFullSize(!fullSize);
  }

  function renderThumbnail() {
    if (category === Category.EMBED) {
      return <EmbeddedAttachment />;
    }

    if (category === Category.AUDIO) {
      return <AudioAttachment />;
    }

    return <AttachmentThumbnail attachment={attachment} size="250px" />;
  }

  function renderFull() {
    if (category === Category.EMBED) {
      return <EmbeddedAttachment />;
    }

    if (category === Category.VIDEO) {
      return <VideoAttachment />;
    }

    return <Image src={ATTACHMENT_URL(attachment)} />;
  }

  const RenderedLink: React.FC = ({ children }) => {
    if (category === Category.AUDIO || category === Category.EMBED) {
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
  const RenderedImage = () => (fullSize ? renderFull() : renderThumbnail());

  return (
    <PostAttachmentContext.Provider
      value={{ attachment, fullSize, toggleSize }}
    >
      <div style={{ display: "inline" }}>
        <RenderedLink>
          <AttachmentBox>
            <RenderedImage />
          </AttachmentBox>
        </RenderedLink>
      </div>
    </PostAttachmentContext.Provider>
  );
}

export default PostAttachment;
