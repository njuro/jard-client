import React from "react";
import { Controller } from "react-hook-form";
import { Form as SemanticForm, FormCheckboxProps } from "semantic-ui-react";

interface CheckboxProps {
  name: string;
}
function Checkbox({
  name,
  ...rest
}: CheckboxProps | Omit<FormCheckboxProps, "name">) {
  return (
    <Controller
      name={name}
      render={({ onChange: onValueChange, value: defaultValue }) => (
        <SemanticForm.Checkbox
          defaultChecked={defaultValue}
          onChange={(_, data) => onValueChange(data.checked)}
          {...rest}
        />
      )}
    />
  );
}

export default Checkbox;
