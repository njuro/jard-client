import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function TextArea({ name, rules, ...rest }) {
  return (
    <RHFInput
      as={<SemanticForm.TextArea {...rest} />}
      defaultValue=""
      name={name}
      rules={rules}
    />
  );
}

export default TextArea;
