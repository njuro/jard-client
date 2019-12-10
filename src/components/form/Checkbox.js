import React from "react";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function Checkbox({ name, ...rest }) {
  function handleChange([, props]) {
    return { checked: props.checked };
  }

  return (
    <RHFInput
      as={<SemanticForm.Checkbox {...rest} />}
      name={name}
      value={name}
      type="checkbox"
      onChangeEvent={handleChange}
    />
  );
}

export default Checkbox;
