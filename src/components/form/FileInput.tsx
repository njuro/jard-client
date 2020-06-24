import React, { ChangeEvent } from "react";
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

  return <SemanticForm.Input type="file" {...rest} onChange={handleChange} />; // TODO use Controller from RHF
}

export default FileInput;
