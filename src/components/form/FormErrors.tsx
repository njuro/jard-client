import React from "react";
import { List, Message } from "semantic-ui-react";

interface FormErrorsProps {
  errors?: object;
}
function FormErrors({ errors }: FormErrorsProps) {
  return (
    (errors && Object.keys(errors).length > 0 && (
      <Message
        error
        content={<List items={Object.values(errors)} bulleted />}
      />
    )) ||
    null
  );
}

export default FormErrors;
