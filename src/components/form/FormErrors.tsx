import React from "react";
import { List, Message } from "semantic-ui-react";

interface FormErrorsProps {
  errors?: string[];
}
function FormErrors({ errors }: FormErrorsProps) {
  return (
    (errors && errors.length > 0 && (
      <Message error={true} content={<List items={errors} bulleted={true} />} />
    )) ||
    null
  );
}

export default FormErrors;
