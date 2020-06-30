import React from "react";
import { ValidationOptions } from "react-hook-form/dist/types";
import { Form as SemanticForm, FormTextAreaProps } from "semantic-ui-react";
import { Controller } from "react-hook-form";

interface TextAreaProps {
  name: string;
  rules?: ValidationOptions;
  [key: string]: any;
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
