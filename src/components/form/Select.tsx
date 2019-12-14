import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

interface SelectProps {
  name: string;
}
function Select({ name, ...rest }: SelectProps & any) {
  function handleChange([, props]: any[]) {
    return { value: props.value };
  }

  // @ts-ignore
  return (
    <RHFInput
      as={((<SemanticForm.Select {...rest} />) as unknown) as React.ElementType}
      name={name}
      onChangeEvent={handleChange}
    />
  );
}

export default Select;
