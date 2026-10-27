import {
  lightColors,
  darkColors,
  defaultColors,
  type UIColors,
} from './colors';
import { defaultTypography, type UITypography } from './typography';
import { defaultSpacing, type UISpacing } from './spacing';
import { defaultShadows, type UIShadows } from './shadows';

export interface UIBorderRadius {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export const defaultBorderRadius: UIBorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export interface UITheme {
  mode: 'light' | 'dark';
  colors: UIColors;
  typography: UITypography;
  spacing: UISpacing;
  borderRadius: UIBorderRadius;
  shadows: UIShadows;
}

export const lightTheme: UITheme = {
  mode: 'light',
  colors: lightColors,
  typography: defaultTypography,
  spacing: defaultSpacing,
  borderRadius: defaultBorderRadius,
  shadows: defaultShadows,
};

export const darkTheme: UITheme = {
  mode: 'dark',
  colors: darkColors,
  typography: defaultTypography,
  spacing: defaultSpacing,
  borderRadius: defaultBorderRadius,
  shadows: defaultShadows,
};

export const defaultTheme: UITheme = lightTheme;

export type { UIColors, UITypography, UISpacing, UIShadows };
export {
  lightColors,
  darkColors,
  defaultColors,
  defaultTypography,
  defaultSpacing,
  defaultShadows,
};
