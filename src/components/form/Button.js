import React from "react";
import { Form as SemanticForm } from "semantic-ui-react";

function Button({ children, ...rest }) {
  return <SemanticForm.Button {...rest}>{children}</SemanticForm.Button>;
}

export default Button;
