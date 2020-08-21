export enum LocalStorageKey {
  OWN_POSTS = "ownPosts",
  RELATIVE_TIMESTAMPS = "relativeTimestamps",
  DELETION_CODE = "deletionCode",
}

export function getFromLocalStorage(key: LocalStorageKey) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
}

export function saveToLocalStorage(key: LocalStorageKey, value: unknown) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function saveToLocalStorageIfMissing(
  key: LocalStorageKey,
  value: unknown
) {
  if (!getFromLocalStorage(key)) {
    saveToLocalStorage(key, value);
  }
}
