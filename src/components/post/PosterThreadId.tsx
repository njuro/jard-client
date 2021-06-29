/* eslint-disable no-bitwise */
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";
import { Popup } from "semantic-ui-react";
import { ThreadContext } from "../thread/Thread";

const PosterThreadIdWrapper = styled.span<{
  textColor: string;
  backgroundColor: string;
}>`
  padding: 0 5px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  cursor: pointer;
`;
function PosterThreadId({ posterId }: { posterId: string }) {
  const { thread, isFull, highlightPostsByPoster } = useContext(ThreadContext);
  const [posterCount, setPosterCount] = useState<number>(0);

  useEffect(
    () =>
      setPosterCount(
        thread && isFull
          ? document
              .getElementById(`thread-${thread.threadNumber}`)
              ?.getElementsByClassName(`posterId-${posterId}`).length ?? -1
          : 0
      ),
    [thread, isFull, posterId]
  );

  function getBackgroundColor(input: string) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += `00${value.toString(16)}`.substr(-2);
    }
    return colour;
  }

  function getContrastColor(color: string) {
    let hex = color;
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }

  const backgroundColor = useMemo(
    () => getBackgroundColor(posterId),
    [posterId]
  );
  const textColor = useMemo(
    () => getContrastColor(backgroundColor),
    [backgroundColor]
  );

  return (
    <>
      (ID:&nbsp;
      <Popup
        disabled={posterCount < 1}
        size="tiny"
        position="top center"
        trigger={
          <PosterThreadIdWrapper
            className={`posterId-${posterId}`}
            backgroundColor={backgroundColor}
            textColor={textColor}
            title="Highlight post by this ID"
            onClick={() => highlightPostsByPoster(posterId)}
          >
            {posterId}
          </PosterThreadIdWrapper>
        }
      >
        {posterCount} posts by this ID
      </Popup>
      )&nbsp;
    </>
  );
}

export default PosterThreadId;
