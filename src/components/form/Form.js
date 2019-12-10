import React, { createContext } from "react";
import useForm from "react-hook-form";
import { Form as SemanticForm } from "semantic-ui-react";

export const FormContext = createContext();

function Form({ children, onSubmit, ...rest }) {
  const { register, setValue, handleSubmit } = useForm();

  return (
    <FormContext.Provider value={{ register, setValue, handleSubmit }}>
      <SemanticForm onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
      </SemanticForm>
    </FormContext.Provider>
  );
}

export { default as TextInput } from "./TextInput";
export { default as Checkbox } from "./Checkbox";
export { default as Select } from "./Select";
export { default as Button } from "./Button";

export default Form;
