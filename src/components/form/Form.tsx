import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Form as SemanticForm,
  FormProps as SemanticFormProps,
} from "semantic-ui-react";
import { FieldValues } from "react-hook-form/dist/types/form";

interface FormProps {
  children: React.ReactFragment;
  onSubmit: SubmitHandler<FieldValues>;
  onUnmount?: (values: FieldValues) => void;
  defaultValues: object;
}
function Form({
  children,
  onSubmit,
  onUnmount,
  defaultValues = {},
  ...rest
}: FormProps | Omit<SemanticFormProps, "onSubmit">) {
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, getValues } = methods;

  useEffect(() => {
    return () => onUnmount && onUnmount(getValues());
  }, [getValues, onUnmount]);

  return (
    <FormProvider {...methods}>
      <SemanticForm onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
      </SemanticForm>
    </FormProvider>
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
