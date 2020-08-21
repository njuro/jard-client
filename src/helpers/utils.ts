import { DropdownItemProps } from "semantic-ui-react";
import moment from "moment";
import { LocalStorageKey } from "./localStorageItems";

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

export function randomString(length: number): string {
  return Array(length + 1)
    .join(`${Math.random().toString(36)}00000000000000000`.slice(2, 18))
    .slice(0, length);
}

export function formatTimestamp(
  timestamp: string,
  allowRelative = false
): string {
  const relative = localStorage.getItem(LocalStorageKey.RELATIVE_TIMESTAMPS);
  if (allowRelative && relative && relative.toLowerCase() === "true") {
    return moment(timestamp).fromNow();
  }

  const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions();
  // TODO get timezone from local storage
  return new Date(timestamp).toLocaleString(locale, { timeZone });
}

export function isLocalhost(): boolean {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname.startsWith("192.168.0")
  );
}
