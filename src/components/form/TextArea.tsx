import React from "react";
import { Form as SemanticForm, FormTextAreaProps } from "semantic-ui-react";
import { Controller, ValidationRules } from "react-hook-form";

interface TextAreaProps {
  name: string;
  rules?: ValidationRules;
}
function TextArea({ name, rules, ...rest }: TextAreaProps | FormTextAreaProps) {
  return (
    <Controller
      as={<SemanticForm.TextArea {...rest} />}
      name={name}
      rules={rules}
    />
  );
}

export default TextArea;
