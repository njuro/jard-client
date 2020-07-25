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
      name={name}
      render={({ onChange: onValueChange, value: defaultValues }) => (
        <SemanticForm.Select
          defaultValue={defaultValues}
          onChange={(_, data) => onValueChange(data.value)}
          {...rest}
        />
      )}
    />
  );
}

export default Select;
