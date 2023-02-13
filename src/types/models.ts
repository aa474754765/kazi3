import { uuid } from "vue-uuid";
import type {
  GradientsTypes,
  WallpaperInfo,
  BgSetting,
  ColorsSetting,
  TextSetting,
  Font,
} from ".";

export const defaultGradientsTypes: GradientsTypes = {
  PASTEL: {
    hue: {
      min: 0,
      max: 1,
    },
    saturation: {
      min: 0.8,
      max: 1,
    },
    lightness: {
      min: 0.9,
      max: 0.9,
    },
  },
  COOL: {
    hue: {
      min: 0,
      max: 1,
    },
    saturation: {
      min: 1,
      max: 1,
    },
    lightness: {
      min: 0.8,
      max: 0.9,
    },
  },
  BRIGHT: {
    hue: {
      min: 0,
      max: 1,
    },
    saturation: {
      min: 0.9,
      max: 1,
    },
    lightness: {
      min: 0.6,
      max: 0.8,
    },
  },
  STRONG: {
    hue: {
      min: 0,
      max: 1,
    },
    saturation: {
      min: 0.8,
      max: 1,
    },
    lightness: {
      min: 0.4,
      max: 0.6,
    },
  },
};

export const defaultWallPaperSettings: WallpaperInfo = {
  bgImage: [
    {
      deg: 283,
      colors: [
        {
          id: uuid.v1(),
          text: "rgb(219, 87, 43)",
          percentage: 0,
        },
        {
          id: uuid.v1(),
          text: "rgb(135, 13, 241)",
          percentage: 62,
        },
        {
          id: uuid.v1(),
          text: "rgb(0, 230, 191)",
          percentage: 100,
        },
      ],
    },
  ],
  texts: [
    {
      id: uuid.v1(),
      text: "Hello",
      font: "cursive",
      size: 48,
      rotate: 0,
      color: "rgb(219,209,71)",
    },
  ],
};
export const newText: TextSetting = {
  id: uuid.v1(),
  text: "Helloooooooo",
  font: "cursive",
  size: 36,
  rotate: 0,
  color: "rgba(255,255,255)",
};

export const newGradientSetting: BgSetting = {
  deg: 0,
  colors: [
    {
      id: uuid.v1(),
      text: "rgba(255, 255, 255, 0)",
      percentage: 0,
    },
    {
      id: uuid.v1(),
      text: "rgba(255, 255, 255, 0)",
      percentage: 100,
    },
  ],
};

export const newColor: ColorsSetting = {
  id: uuid.v1(),
  text: "rgba(255, 255, 255, 0)",
  percentage: 100,
};

export const selectedFonts: Font[] = [
  {
    label: "Cursive",
    value: "cursive",
  },
];
