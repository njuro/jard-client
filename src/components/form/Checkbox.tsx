import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

interface CheckboxProps {
  name: string;
}
function Checkbox({ name, ...rest }: CheckboxProps & any) {
  function handleChange([, props]: any[]) {
    return { checked: props.checked };
  }

  return (
    <RHFInput
      as={
        ((<SemanticForm.Checkbox {...rest} />) as unknown) as React.ElementType
      }
      name={name}
      value={name}
      type="checkbox"
      onChangeEvent={handleChange}
    />
  );
}

export default Checkbox;
