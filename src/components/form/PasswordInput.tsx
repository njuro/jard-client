import React, { useState } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { Form as SemanticForm, FormInputProps, Icon } from "semantic-ui-react";
import useValidationMessages from "./useValidationMessages";

interface PasswordInputProps {
  name: string;
  rules?: RegisterOptions;
}
function PasswordInput({
  name,
  rules,
  ...rest
}: PasswordInputProps | FormInputProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const getValidationMessage = useValidationMessages();

  return (
    <Controller
      render={({ field }) => (
        <SemanticForm.Input
          type={visible ? "text" : "password"}
          error={getValidationMessage(name)}
          {...field}
          {...rest}
          icon={
            <Icon
              name={visible ? "eye slash" : "eye"}
              link
              onClick={() => setVisible(!visible)}
            />
          }
        />
      )}
      name={name}
      rules={rules}
      defaultValue=""
    />
  );
}

export default PasswordInput;
