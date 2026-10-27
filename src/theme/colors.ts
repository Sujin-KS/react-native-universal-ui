export interface UIColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  tertiary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  divider: string;
  placeholder: string;
  disabled: string;
  disabledBackground: string;
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  warning: string;
  warningLight: string;
  info: string;
  infoLight: string;
  white: string;
  black: string;
  transparent: string;
}

export const lightColors: UIColors = {
  primary: '#166534', // Forest Emerald
  primaryLight: '#DCFCE7', // Soft mint green
  primaryDark: '#14532D', // Deep forest
  secondary: '#15803D', // Medium lush green
  secondaryLight: '#BBF7D0',
  secondaryDark: '#166534',
  tertiary: '#0F766E', // Teal green
  accent: '#10B981', // Vibrant emerald accent
  background: '#F0FDF4', // Very light mint/green tint
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  text: '#14532D', // Dark green readability
  textSecondary: '#4B6353', // Muted slate-green
  textMuted: '#6B7280',
  textInverse: '#FFFFFF',
  border: '#BBF7D0',
  divider: '#E2E8F0',
  placeholder: '#9CA3AF',
  disabled: '#A7B8AA',
  disabledBackground: '#E5E7EB',
  success: '#15803D',
  successLight: '#DCFCE7',
  error: '#DC2626',
  errorLight: '#FEE2E2',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  info: '#0284C7',
  infoLight: '#E0F2FE',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const darkColors: UIColors = {
  primary: '#22C55E', // Bright emerald for dark mode contrast
  primaryLight: '#166534',
  primaryDark: '#14532D',
  secondary: '#4ADE80',
  secondaryLight: '#15803D',
  secondaryDark: '#166534',
  tertiary: '#14B8A6',
  accent: '#34D399',
  background: '#052E16', // Deep night forest
  surface: '#0B3D20', // Elevated night emerald
  surfaceElevated: '#114D2A',
  card: '#0B3D20',
  text: '#ECFDF5', // Crisp light green-white
  textSecondary: '#86EFAC',
  textMuted: '#9CA3AF',
  textInverse: '#052E16',
  border: '#166534',
  divider: '#1F472D',
  placeholder: '#6B7280',
  disabled: '#4B6353',
  disabledBackground: '#1F2937',
  success: '#4ADE80',
  successLight: '#064E3B',
  error: '#F87171',
  errorLight: '#450A0A',
  warning: '#FBBF24',
  warningLight: '#451A03',
  info: '#38BDF8',
  infoLight: '#082F49',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const defaultColors: UIColors = lightColors;
