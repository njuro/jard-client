import React from "react";
import { Form as SemanticForm, FormTextAreaProps } from "semantic-ui-react";
import { Controller } from "react-hook-form";

function TextArea({ name, rules, ...rest }: FormTextAreaProps) {
  return (
    <Controller
      as={<SemanticForm.TextArea {...rest} />}
      name={name}
      rules={rules}
    />
  );
}

export default TextArea;
