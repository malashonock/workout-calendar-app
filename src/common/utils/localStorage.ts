export const getFromLocalStorage = <T>(key: string, fallback: T): T => {
  const stringified = window.localStorage.getItem(key);
  const parsed = stringified ? (JSON.parse(stringified) as T) : fallback;
  return parsed;
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
