import type { TextStyle } from 'react-native';

export interface UITypographyVariants {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  subtitle1: number;
  subtitle2: number;
  body1: number;
  body2: number;
  caption: number;
  overline: number;
  button: number;
}

export interface UILineHeights {
  'xs': number;
  'sm': number;
  'md': number;
  'lg': number;
  'xl': number;
  'xxl': number;
  '3xl': number;
}

export interface UILetterSpacing {
  tight: number;
  normal: number;
  wide: number;
}

export interface UIFontWeights {
  regular: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semiBold: TextStyle['fontWeight'];
  bold: TextStyle['fontWeight'];
}

export interface UITypography {
  fontFamily: string;
  fontFamilyMedium: string;
  fontFamilySemiBold: string;
  fontFamilyBold: string;
  fontSize: number;
  sizes: UITypographyVariants;
  lineHeights: UILineHeights;
  letterSpacing: UILetterSpacing;
  weights: UIFontWeights;
  // Direct shortcuts for backwards compatibility
  h1: number;
  h2: number;
  h3: number;
  body: number;
  caption: number;
  button: number;
}

export const defaultTypography: UITypography = {
  fontFamily: 'System',
  fontFamilyMedium: 'System',
  fontFamilySemiBold: 'System',
  fontFamilyBold: 'System',
  fontSize: 16,
  sizes: {
    h1: 32,
    h2: 26,
    h3: 22,
    h4: 18,
    h5: 16,
    h6: 14,
    subtitle1: 16,
    subtitle2: 14,
    body1: 16,
    body2: 14,
    caption: 12,
    overline: 10,
    button: 16,
  },
  lineHeights: {
    'xs': 14,
    'sm': 18,
    'md': 22,
    'lg': 26,
    'xl': 30,
    'xxl': 36,
    '3xl': 42,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  h1: 32,
  h2: 26,
  h3: 22,
  body: 16,
  caption: 12,
  button: 16,
};
