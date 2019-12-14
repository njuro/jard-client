import React from "react";
import { RHFInput } from "react-hook-form-input";
import { ValidationOptions } from "react-hook-form/dist/types";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";

interface TextInputProps {
  name: string;
  rules?: ValidationOptions;
}
function TextInput({ name, rules, ...rest }: TextInputProps | FormInputProps) {
  return (
    <RHFInput
      as={((<SemanticForm.Input {...rest} />) as unknown) as React.ElementType}
      defaultValue=""
      name={name}
      rules={rules}
    />
  );
}

export default TextInput;
