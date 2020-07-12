import { DropdownItemProps } from "semantic-ui-react";
import moment from "moment";

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

export function formatTimestamp(timestamp: string): string {
  const relative = localStorage.getItem("relativeTimestamps");
  if (relative && relative.toLowerCase() === "true") {
    return moment(timestamp).fromNow();
  }

  const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions();
  // TODO get timezone from local storage
  return new Date(timestamp).toLocaleString(locale, { timeZone });
}

export function isLocal(): boolean {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname.startsWith("192.168.0")
  );
}
