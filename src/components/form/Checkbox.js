import React, { useContext } from "react";
import { FormContext } from "./Form";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function Checkbox({ name, label, ...rest }) {
  const { register, setValue } = useContext(FormContext);

  function handleChange([, props]) {
    return { checked: props.checked };
  }

  return (
    <RHFInput
      as={<SemanticForm.Checkbox label={label} {...rest} />}
      name={name}
      value={name}
      type="checkbox"
      register={register}
      setValue={setValue}
      onChangeEvent={handleChange}
    />
  );
}

export default Checkbox;
