import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function FileInput({ name, rules, onFileUpload, ...rest }) {
  function handleChange([event]) {
    const file = event.target.files[0];
    onFileUpload(file);
  }

  return (
    <RHFInput
      as={<SemanticForm.Input type="file" {...rest} />}
      name={name}
      rules={rules}
      onChangeEvent={handleChange}
    />
  );
}

export default FileInput;
