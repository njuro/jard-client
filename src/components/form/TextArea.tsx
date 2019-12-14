import React from "react";
import { RHFInput } from "react-hook-form-input";
import { ValidationOptions } from "react-hook-form/dist/types";
import { Form as SemanticForm, FormTextAreaProps } from "semantic-ui-react";

interface TextAreaProps {
  name: string;
  rules?: ValidationOptions;
}
function TextArea({ name, rules, ...rest }: TextAreaProps | FormTextAreaProps) {
  return (
    <RHFInput
      as={
        ((<SemanticForm.TextArea {...rest} />) as unknown) as React.ElementType
      }
      defaultValue=""
      name={name}
      rules={rules}
    />
  );
}

export default TextArea;
