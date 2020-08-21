import { toast } from "react-semantic-toasts";
import { SemanticCOLORS } from "semantic-ui-react";

type NotificationType = "info" | "success" | "warning" | "error";

// noinspection JSUnusedGlobalSymbols
export function notifySuccess(title: string, message: string) {
  notify("success", "green", title, message);
}

// noinspection JSUnusedGlobalSymbols
export function notifyInfo(title: string, message: string) {
  notify("info", "blue", title, message);
}

// noinspection JSUnusedGlobalSymbols
export function notifyWarning(title: string, message: string) {
  notify("warning", "orange", title, message);
}

// noinspection JSUnusedGlobalSymbols
export function notifyError(title: string, message: string) {
  notify("error", "red", title, message);
}

function notify(
  type: NotificationType,
  color: SemanticCOLORS,
  title: string,
  message: string
) {
  toast({
    title,
    description: message,
    type,
    time: 5000,
    animation: "fade down",
    size: "small",
    color,
  });
}
