import { useFormContext } from "react-hook-form";

export default function useValidationMessages() {
  const {
    formState: { errors },
  } = useFormContext();

  function getErrorField(name: string) {
    if (!errors || !name) {
      return undefined;
    }

    return name
      .split(".")
      .reduce((parent, child) => (parent ? parent[child] : undefined), errors);
  }

  function getValidationMessage(name: string) {
    const errorField = getErrorField(name);
    if (!errorField) {
      return undefined;
    }

    const { type, message: value } = errorField;

    let message;
    switch (type) {
      case "required":
        message = "This field is required";
        break;
      case "min":
        message = `Cannot be lower than ${value}`;
        break;
      case "max":
        message = `Cannot be higher than ${value}`;
        break;
      case "minLength":
        message = `Must be at least ${value} characters`;
        break;
      case "maxLength":
        message = `Cannot be more than ${value} characters`;
        break;
      case "pattern":
        message = "Invalid format";
        break;
      case "validate":
      default:
        message = value;
    }

    return {
      content: message,
      pointing: "above",
    };
  }

  return getValidationMessage;
}
