import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function TextInput({ name, rules, ...rest }) {
  return (
    <RHFInput
      as={<SemanticForm.Input {...rest} />}
      defaultValue=""
      name={name}
      rules={rules}
    />
  );
}

export default TextInput;
