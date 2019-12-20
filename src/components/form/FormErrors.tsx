import React from "react";
import { List, Message } from "semantic-ui-react";

interface FormErrorsProps {
  errors?: Map<string, string>;
}
function FormErrors({ errors }: FormErrorsProps) {
  return (
    (errors && errors.size > 0 && (
      <Message
        error={true}
        content={<List items={Array.from(errors?.values())} bulleted={true} />}
      />
    )) ||
    null
  );
}

export default FormErrors;
