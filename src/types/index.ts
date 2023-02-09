export type Theme = "light" | "dark";
export type ViewMode = "overview" | "preview";

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
export type RBGType = "red" | "green" | "blue";
export type RBGValue = {
  [key in RBGType]: number;
};
export type HSLInfo = {
  [key in HSLType]: { min: number; max: number };
};
export type GradientsTypes = {
  [key in GradientsType]?: HSLInfo;
};
export interface BoxInfo {
  deg: number;
  colors: string[];
}

export interface ColorsSetting {
  text: string;
  percentage?: number;
}
export interface BgSetting {
  deg: number;
  colors: ColorsSetting[];
}
export interface TextSetting {
  text: string;
  size: number;
  rotate: number;
  font: string;
}
export interface WallpaperInfo {
  bgImage: BgSetting[];
  texts?: TextSetting[];
}
