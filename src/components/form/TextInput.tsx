import React from "react";
import { ValidationRules } from "react-hook-form/dist/types";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";
import { Controller } from "react-hook-form";
import useValidationMessages from "./useValidationMessages";

interface TextInputProps {
  name: string;
  hidden?: boolean;
  rules?: ValidationRules;
}
function TextInput({
  name,
  hidden,
  rules,
  ...rest
}: TextInputProps | FormInputProps) {
  const getValidationMessage = useValidationMessages();

  return (
    <Controller
      as={
        hidden ? (
          <input type="hidden" />
        ) : (
          <SemanticForm.Input error={getValidationMessage(name)} {...rest} />
        )
      }
      name={name}
      rules={rules}
      defaultValue=""
    />
  );
}

export default TextInput;
