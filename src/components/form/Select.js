import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function Select({ name, ...rest }) {
  function handleChange([, props]) {
    return { value: props.value };
  }

  return (
    <RHFInput
      as={<SemanticForm.Select {...rest} />}
      name={name}
      onChangeEvent={handleChange}
    />
  );
}

export default Select;
