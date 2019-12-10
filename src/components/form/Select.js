import React, { useContext } from "react";
import { FormContext } from "./Form";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function Select({ name, label, placeholder, options, ...rest }) {
  const { register, setValue } = useContext(FormContext);

  function handleChange([, props]) {
    return { value: props.value };
  }

  return (
    <RHFInput
      as={
        <SemanticForm.Select
          label={label}
          placeholder={placeholder}
          options={options}
          {...rest}
        />
      }
      name={name}
      register={register}
      setValue={setValue}
      onChangeEvent={handleChange}
    />
  );
}

export default Select;
