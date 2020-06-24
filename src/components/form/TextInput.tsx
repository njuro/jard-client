import React from "react";
import { ValidationOptions } from "react-hook-form/dist/types";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";
import { Controller } from "react-hook-form";

interface TextInputProps {
  name: string;
  rules?: ValidationOptions;
}
function TextInput({ name, rules, ...rest }: TextInputProps | FormInputProps) {
  return (
    <Controller
      as={<SemanticForm.Input {...rest} />}
      name={name}
      rules={rules}
      defaultValue=""
    />
  );
}

export default TextInput;
