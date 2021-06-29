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
      name={name}
      render={({ field: { onChange: onValueChange, value: defaultValue } }) => (
        <SemanticDatepicker
          value={defaultValue}
          onChange={(_, data) => onValueChange(data.value)}
          {...rest}
        />
      )}
    />
  );
}

export default DatePicker;
