import React from "react";
import { useFormContext } from "react-hook-form";
import { FormInputProps, Icon } from "semantic-ui-react";
import { TextInput } from "./Form";

interface SearchBarProps {
  name: string;
  onSubmit: ({ query }: { query: string }) => void;
}
function SearchBar({
  name,
  onSubmit,
  ...rest
}: SearchBarProps | FormInputProps) {
  const { handleSubmit } = useFormContext();

  return (
    <TextInput
      name={name}
      icon={
        <Icon name="search" link onClick={() => handleSubmit(onSubmit)()} />
      }
      {...rest}
    />
  );
}

export default SearchBar;
