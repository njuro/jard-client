export enum LocalStorageKey {
  OWN_POSTS = "ownPosts",
  RELATIVE_TIMESTAMPS = "relativeTimestamps",
}

export function getFromLocalStorage(key: LocalStorageKey) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
}

export function saveToLocalStorage(key: LocalStorageKey, value: object) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
