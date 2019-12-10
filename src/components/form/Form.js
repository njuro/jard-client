import React from "react";
import useForm, { FormContext } from "react-hook-form";
import { Form as SemanticForm } from "semantic-ui-react";

function Form({ children, onSubmit, ...rest }) {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormContext {...methods}>
      <SemanticForm onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
      </SemanticForm>
    </FormContext>
  );
}

export { default as TextInput } from "./TextInput";
export { default as Checkbox } from "./Checkbox";
export { default as Select } from "./Select";
export { default as Button } from "./Button";
export { default as TextArea } from "./TextArea";
export { default as FileInput } from "./FileInput";

export default Form;
