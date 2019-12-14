import React from "react";
import { Form as SemanticForm, FormButtonProps } from "semantic-ui-react";

interface ButtonProps {
  children: React.ReactFragment;
}
function Button({ children, ...rest }: ButtonProps | FormButtonProps) {
  return <SemanticForm.Button {...rest}>{children}</SemanticForm.Button>;
}

export default Button;
