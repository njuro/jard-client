import { DropdownItemProps } from "semantic-ui-react";

export function objectToJsonBlob(data: object) {
  return new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
}

export function objectToDropdownItem(
  value: boolean | number | string,
  text: string,
  description?: string
): DropdownItemProps {
  return { key: value, text, value, description };
}

export function capitalize(input: string): string {
  return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
}
