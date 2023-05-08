export const getFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const stringified = window.localStorage.getItem(key);
    const parsed = stringified ? JSON.parse(stringified) : null;
    return (parsed as T) ?? fallback;
  } catch (error) {
    return fallback;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
