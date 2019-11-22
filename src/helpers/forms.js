export function objectToFormData(data) {
    return new Blob([JSON.stringify(data)], {
        type: 'application/json'
    });
}