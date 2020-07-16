import React from "react";
import { Progress, ProgressProps } from "semantic-ui-react";

interface ProgressBarProps {
  visible: boolean;
  percent: number | string;
}
function ProgressBar({
  visible,
  percent,
  ...rest
}: ProgressBarProps | ProgressProps) {
  return (
    <Progress
      style={{ display: visible ? "block" : "none" }}
      indicating
      progress
      percent={percent}
      {...rest}
    />
  );
}

export default ProgressBar;
