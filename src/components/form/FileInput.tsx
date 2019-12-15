import React, { ChangeEvent } from "react";
import { RHFInput } from "react-hook-form-input";
import { ValidationOptions } from "react-hook-form/dist/types";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";

interface FileInputProps {
  name: string;
  rules?: ValidationOptions;
  onFileUpload: (args: File) => any;
}
function FileInput({
  name,
  rules,
  onFileUpload,
  ...rest
}: FileInputProps | FormInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    onFileUpload(file);
  }

  return (
    <RHFInput
      as={<SemanticForm.Input type="file" {...rest} />}
      name={name}
      rules={rules}
      onChange={handleChange}
    />
  );
}

export default FileInput;
