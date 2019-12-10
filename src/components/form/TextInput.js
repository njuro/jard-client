import React, { useContext } from "react";
import { FormContext } from "./Form";
import { RHFInput } from "react-hook-form-input";
import { Form as SemanticForm } from "semantic-ui-react";

function TextInput({ name, label, placeholder, ...rest }) {
  const { register, setValue } = useContext(FormContext);

  return (
    <RHFInput
      as={
        <SemanticForm.Input label={label} placeholder={placeholder} {...rest} />
      }
      defaultValue=""
      name={name}
      register={register}
      setValue={setValue}
    />
  );
}

export default TextInput;
