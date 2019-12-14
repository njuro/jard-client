import React from "react";
import useForm, { FormContext } from "react-hook-form";
import { Form as SemanticForm } from "semantic-ui-react";

interface FormProps {
  children: React.ReactFragment;
  onSubmit: (args: any) => void;
  defaultValues: object;
}
function Form({
  children,
  onSubmit,
  defaultValues = {},
  ...rest
}: FormProps & any) {
  const methods = useForm({
    defaultValues: defaultValues
  });
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
export { default as FormErrors } from "./FormErrors";

export default Form;
