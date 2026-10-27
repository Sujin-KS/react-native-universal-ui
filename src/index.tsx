// Theme & Provider
export {
  UIProvider,
  useTheme,
  type UIThemeOverrides,
  type UIProviderProps,
  type UIThemeContextType,
  type ThemeMode,
} from './theme/ThemeProvider';

export {
  defaultTheme,
  lightTheme,
  darkTheme,
  lightColors,
  darkColors,
  defaultColors,
  defaultTypography,
  defaultSpacing,
  defaultShadows,
  defaultBorderRadius,
  type UITheme,
  type UIColors,
  type UITypography,
  type UISpacing,
  type UIShadows,
  type UIBorderRadius,
} from './theme';

// Universal UI Components
export * from './components';

// Icon and Utilities
export { UIIcon, deepMerge, type IconProps, type IconType } from './utils';

// Legacy scaffold utility
export { multiply } from './multiply';
