import React from "react";
import {
  DropdownItemProps,
  Form as SemanticForm,
  FormSelectProps,
} from "semantic-ui-react";
import { Controller } from "react-hook-form";

interface SelectProps {
  name: string;
  options: DropdownItemProps[];
}
function Select({ name, ...rest }: SelectProps | FormSelectProps) {
  return (
    <Controller
      as={<SemanticForm.Select {...rest} />}
      name={name}
      onChange={([, data]) => data.value}
    />
  );
}

export default Select;
