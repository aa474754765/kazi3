import type { GradientsTypes } from ".";

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
