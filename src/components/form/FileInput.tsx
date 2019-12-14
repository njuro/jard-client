import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";
import { ValidationOptions } from "react-hook-form/dist/types";

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
}: FileInputProps & any) {
  function handleChange([event]: any[]) {
    const file = event.target.files[0];
    onFileUpload(file);
    return {};
  }

  // @ts-ignore
  return (
    <RHFInput
      as={
        ((
          <SemanticForm.Input type="file" {...rest} />
        ) as unknown) as React.ElementType
      }
      name={name}
      rules={rules}
      onChangeEvent={handleChange}
    />
  );
}

export default FileInput;
