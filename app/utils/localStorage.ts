export const getItemFromLocalStorage = (itemKey: string, shouldParse = true) => {
  const storedValue = localStorage.getItem(itemKey);

  if (!storedValue) {
    return undefined;
  }

  return shouldParse ? JSON.parse(storedValue) : storedValue;
};

export const storeItemInLocalStorage = (itemKey: string, object: unknown) => {
  localStorage.setItem(itemKey, JSON.stringify(object));
};

export const deleteItemFromLocalStorage = (itemKey: string) => localStorage.removeItem(itemKey);
