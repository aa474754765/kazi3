import type { GradientsTypes, WallpaperInfo } from ".";

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
          text: "rgb(233, 254, 98)",
          percentage: 0,
        },
        {
          text: "rgb(224, 13, 241)",
          percentage: 40,
        },
        {
          text: "rgb(250, 85, 196)",
          percentage: 100,
        },
      ],
    },
    {
      deg: 205,
      colors: [
        {
          text: "rgb(254, 123, 244)",
          percentage: 0,
        },
        {
          text: "rgb(139, 251, 208)",
          percentage: 100,
        },
      ],
    },
  ],
  texts: [
    {
      text: "Hello",
      font: "cursive",
      size: 36,
      rotate: 0,
      color: "purple",
    },
  ],
};
