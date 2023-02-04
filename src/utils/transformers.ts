import type { GradientsType, HSLInfo, HSLValue } from "@/types";
import { defaultGradientsTypes } from "@/types/models";

function generateHSL(hslData: HSLValue): number[] {
  const arr: number[] = [];
  hslData &&
    Object.values(hslData).forEach((val) => {
      arr.push(val);
    });
  return arr;
}

function generateRandomHSL(type: GradientsType, data?: HSLInfo): number[] {
  const hslData = type === "CUSTOMIZE" ? data : defaultGradientsTypes[type];
  const arr: number[] = [];
  hslData &&
    Object.values(hslData).forEach((val) => {
      arr.push(Math.random() * (val.max - val.min) + val.min);
    });
  return arr;
}

function hueTorgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(hslArray: number[]): number[] {
  const [h, s, l] = [...hslArray];
  let r, g, b;

  if (s == 0 || hslArray.length !== 3) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueTorgb(p, q, h + 1 / 3);
    g = hueTorgb(p, q, h);
    b = hueTorgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// random degree from 0 to 360
export function randomDeg(): string {
  return Math.round(Math.random() * 360) + "";
}

// generate RBG based on the given gradients type or the given hsl values
export function generateRGB(data: HSLValue): string {
  const hslArray = generateHSL(data);
  return hslToRgb(hslArray).join(",");
}

export function generateRandomRGBByType(
  type: GradientsType,
  data?: HSLInfo | undefined
): string {
  const hslArray = generateRandomHSL(type, data);
  return hslToRgb(hslArray).join(",");
}
