import React from "react";
import { RHFInput } from "react-hook-form-input";
import {
  DropdownItemProps,
  Form as SemanticForm,
  FormSelectProps
} from "semantic-ui-react";

interface SelectProps {
  name: string;
  options: DropdownItemProps[];
}
function Select({ name, ...rest }: SelectProps | FormSelectProps) {
  function handleChange([, props]: any[]) {
    return { value: props.value };
  }

  return (
    <RHFInput
      as={((<SemanticForm.Select {...rest} />) as unknown) as React.ElementType}
      name={name}
      onChangeEvent={handleChange}
    />
  );
}

export default Select;
