import React from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Controller } from "react-hook-form";
import { SemanticDatepickerProps } from "react-semantic-ui-datepickers/dist/types";

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
      onChange={([, data]) => data.value}
    />
  );
}

export default DatePicker;
