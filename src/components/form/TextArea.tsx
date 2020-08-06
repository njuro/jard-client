import React from "react";
import { Form as SemanticForm, FormTextAreaProps } from "semantic-ui-react";
import { Controller, ValidationRules } from "react-hook-form";
import useValidationMessages from "./useValidationMessages";

interface TextAreaProps {
  name: string;
  rules?: ValidationRules;
}
function TextArea({ name, rules, ...rest }: TextAreaProps | FormTextAreaProps) {
  const getValidationMessage = useValidationMessages();

  return (
    <Controller
      as={
        <SemanticForm.TextArea error={getValidationMessage(name)} {...rest} />
      }
      name={name}
      rules={rules}
    />
  );
}

export default TextArea;
