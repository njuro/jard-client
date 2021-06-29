import React from "react";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";
import { Controller, RegisterOptions } from "react-hook-form";
import useValidationMessages from "./useValidationMessages";

interface TextInputProps {
  name: string;
  hidden?: boolean;
  rules?: RegisterOptions;
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
      render={({ field }) =>
        hidden ? (
          <input type="hidden" />
        ) : (
          <SemanticForm.Input
            error={getValidationMessage(name)}
            {...field}
            {...rest}
          />
        )
      }
      name={name}
      rules={rules}
      defaultValue=""
    />
  );
}

export default TextInput;
