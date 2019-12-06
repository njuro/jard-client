export function objectToFormData(data) {
  return new Blob([JSON.stringify(data)], {
    type: "application/json"
  });
}

export function objectToDropdownItems(value, description) {
  return { key: value, text: description, value: value };
}
