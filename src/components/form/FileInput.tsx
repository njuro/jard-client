import React, { ChangeEvent } from "react";
import { Form as SemanticForm, FormInputProps } from "semantic-ui-react";
import { useFormContext } from "react-hook-form";
import useValidationMessages from "./useValidationMessages";

interface FileInputProps {
  name: string;
  maxSize?: number;
  onFileUpload: (args: File) => void;
}
function FileInput({
  name,
  onFileUpload,
  maxSize,
  ...rest
}: FileInputProps | FormInputProps) {
  const { setError, clearErrors } = useFormContext();
  const getValidationMessage = useValidationMessages();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      if (maxSize && file.size > maxSize) {
        setError(name, {
          type: "validate",
          message: `Cannot be larger than ${maxSize} bytes`,
        });
      } else {
        clearErrors(name);
      }
      onFileUpload(file);
    }
  }

  return (
    <SemanticForm.Input
      error={getValidationMessage(name)}
      type="file"
      {...rest}
      onChange={handleChange}
    />
  );
}

export default FileInput;
