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
      as={<SemanticForm.Checkbox {...rest} />}
      name={name}
      onChange={([_, data]) => data.checked}
    />
  );
}

export default Checkbox;
