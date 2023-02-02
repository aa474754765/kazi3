export const randowArr = (length: number): number[] => {
  return new Array(length).fill(1).map(() => Math.random());
};
