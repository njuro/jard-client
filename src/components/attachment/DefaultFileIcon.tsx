import React from "react";
import styled from "styled-components/macro";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";

export const DefaultFileIconWrapper = styled.div<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  & > * {
    width: 100%;
    height: 100%;
  }
`;
interface DefaultFileIconProps {
  filename: string;
}
function DefaultFileIcon({ filename }: DefaultFileIconProps) {
  const ext = filename.split(".").pop();
  return (
    <FileIcon
      labelUppercase
      extension={ext}
      {...defaultStyles[ext as DefaultExtensionType]}
    />
  );
}

export default DefaultFileIcon;
