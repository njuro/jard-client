import { DropdownItemProps } from "semantic-ui-react";

export function objectToJsonBlob(data: object) {
  return new Blob([JSON.stringify(data)], {
    type: "application/json"
  });
}

export function objectToDropdownItem(
  value: any,
  description: string
): DropdownItemProps {
  return { key: value, text: description, value };
}
