import React from "react";
import { Form as SemanticForm, FormTextAreaProps } from "semantic-ui-react";
import { Controller, RegisterOptions } from "react-hook-form";
import useValidationMessages from "./useValidationMessages";

interface TextAreaProps {
  name: string;
  rules?: RegisterOptions;
}
function TextArea({ name, rules, ...rest }: TextAreaProps | FormTextAreaProps) {
  const getValidationMessage = useValidationMessages();

  return (
    <Controller
      render={({ field }) => (
        <SemanticForm.TextArea
          error={getValidationMessage(name)}
          {...field}
          {...rest}
        />
      )}
      name={name}
      rules={rules}
    />
  );
}

export default TextArea;
