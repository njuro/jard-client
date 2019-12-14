import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";
import { ValidationOptions } from "react-hook-form/dist/types";

interface TextAreaProps {
  name: string;
  rules?: ValidationOptions;
}
function TextArea({ name, rules, ...rest }: TextAreaProps & any) {
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
