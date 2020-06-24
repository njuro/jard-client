import React from "react";
import { FormContext, useForm } from "react-hook-form";
import { OnSubmit } from "react-hook-form/dist/types";
import {
  Form as SemanticForm,
  FormProps as SemanticFormProps,
} from "semantic-ui-react";

interface FormProps {
  children: React.ReactFragment;
  onSubmit: OnSubmit<Record<string, any>>;
  defaultValues: object;
}
function Form({
  children,
  onSubmit,
  defaultValues = {},
  ...rest
}: FormProps | Omit<SemanticFormProps, "onSubmit">) {
  const methods = useForm({
    defaultValues,
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
export { default as DatePicker } from "./DatePicker";
export { default as FormErrors } from "./FormErrors";

export default Form;
