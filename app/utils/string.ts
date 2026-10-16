export const trimEnd = (str: string, maxCar: number) => {
  return str.length > maxCar ? `${str.substring(0, maxCar)}...` : str;
};

export const titleCase = (str: string) =>
  str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase());
