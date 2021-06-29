import React, { useEffect, useRef } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Form as SemanticForm,
  FormProps as SemanticFormProps,
} from "semantic-ui-react";
import { UnpackNestedValue } from "react-hook-form/dist/types/form";
import { SetStateType } from "../../types";

interface FormProps {
  children: React.ReactFragment;
  onSubmit: SubmitHandler<FieldValues>;
  onUnmount?: (values: FieldValues) => void;
  triggerReset?: boolean;
  setTriggerReset?: SetStateType<boolean>;
  defaultValues: object;
}
function Form({
  children,
  onSubmit,
  onUnmount,
  triggerReset = false,
  setTriggerReset,
  defaultValues = {},
  ...rest
}: FormProps | Omit<SemanticFormProps, "onSubmit">) {
  const getValuesRef = useRef<() => UnpackNestedValue<FieldValues>>();
  useEffect(() => {
    return () => {
      if (onUnmount && getValuesRef.current) {
        onUnmount(getValuesRef.current());
      }
    };
  }, [onUnmount]);

  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, getValues, reset } = methods;
  useEffect(() => {
    getValuesRef.current = getValues;
  }, [getValues]);

  useEffect(() => {
    if (triggerReset && setTriggerReset) {
      reset();
      setTriggerReset(false);
    }
  }, [reset, setTriggerReset, triggerReset]);

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
export { default as Captcha } from "./Captcha";
export { default as ProgressBar } from "./ProgressBar";
export { default as SearchBar } from "./SearchBar";
export { default as FormErrors } from "./FormErrors";

export default Form;
