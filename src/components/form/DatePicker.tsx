import React from "react";
import {
  Form as SemanticForm,
  FormCheckboxProps,
  FormInputProps,
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { SemanticDatepickerProps } from "react-semantic-ui-datepickers/dist/types";
import { Controller } from "react-hook-form";

interface DatePickerProps {
  name: string;
}
function DatePicker({
  name,
  ...rest
}: DatePickerProps | SemanticDatepickerProps) {
  return (
    <Controller
      as={<SemanticDatepicker {...rest} />}
      name={name}
      onChange={([_, data]) => data.value}
    />
  );
}

export default DatePicker;
