export const randowArr = (length: number): number[] => {
  return new Array(length).fill(1).map(() => Math.random());
};

export const deepClone = <T>(data: T): T => {
  if (typeof data !== "object") {
    return data;
  }
  const result: Record<string, any> = Array.isArray(data) ? [] : {};
  for (const key in data) {
    if (!!data[key] && typeof data[key] === "object") {
      result[key] = deepClone(data[key]);
    } else {
      result[key] = data[key];
    }
  }
  return result as T;
};
