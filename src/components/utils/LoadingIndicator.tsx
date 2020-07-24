import React from "react";
import styled from "styled-components/macro";
import { Loader } from "semantic-ui-react";

const LoadingIndicatorWrapper = styled(Loader)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;
function LoadingIndicator() {
  return <LoadingIndicatorWrapper active size="large" />;
}

export default LoadingIndicator;
