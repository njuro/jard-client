import React, { ChangeEvent } from "react";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";

interface FileInputProps {
  name: string;
  onFileUpload: (args: File) => void;
}
function FileInput({ onFileUpload, ...rest }: FileInputProps | FormInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      onFileUpload(file);
    }
  }

  return <SemanticForm.Input type="file" {...rest} onChange={handleChange} />; // TODO use Controller from RHF
}

export default FileInput;
