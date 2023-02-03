export type Theme = "light" | "dark";

export type GradientsType =
  | "PASTEL"
  | "COOL"
  | "BRIGHT"
  | "STRONG"
  | "CUSTOMIZE";
export type HSLType = "hue" | "saturation" | "lightness";
export type HSLValue = {
  [key in HSLType]: number;
};
export type HSLInfo = {
  [key in HSLType]: { min: number; max: number };
};
export type GradientsTypes = {
  [key in GradientsType]?: HSLInfo;
};
