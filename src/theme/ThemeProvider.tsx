import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type PropsWithChildren,
} from 'react';
import { useColorScheme } from 'react-native';

import {
  defaultTheme,
  lightTheme,
  darkTheme,
  type UITheme,
  type UIColors,
  type UITypography,
  type UISpacing,
  type UIBorderRadius,
  type UIShadows,
} from './index';
import { deepMerge } from '../utils/deepMerge';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface UIThemeOverrides {
  mode?: 'light' | 'dark';
  colors?: Partial<UIColors>;
  typography?: DeepPartial<UITypography>;
  spacing?: Partial<UISpacing>;
  borderRadius?: Partial<UIBorderRadius>;
  shadows?: Partial<UIShadows>;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UIThemeContextType extends UITheme {
  isDark: boolean;
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const fallbackContext: UIThemeContextType = {
  ...defaultTheme,
  isDark: false,
  themeMode: 'light',
  toggleThemeMode: () => {},
  setThemeMode: () => {},
};

const UIContext = createContext<UIThemeContextType>(fallbackContext);

export interface UIProviderProps extends PropsWithChildren {
  theme?: UIThemeOverrides;
  mode?: ThemeMode;
}

export function UIProvider({
  theme: customTheme,
  mode: initialMode = 'system',
  children,
}: UIProviderProps) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>(
    customTheme?.mode ?? initialMode
  );

  const effectiveMode: 'light' | 'dark' = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themeMode;
  }, [themeMode, systemColorScheme]);

  const isDark = effectiveMode === 'dark';

  const toggleThemeMode = useCallback(() => {
    setThemeModeState((prev) => {
      const current =
        prev === 'system'
          ? systemColorScheme === 'dark'
            ? 'dark'
            : 'light'
          : prev;
      return current === 'light' ? 'dark' : 'light';
    });
  }, [systemColorScheme]);

  const setThemeMode = useCallback((newMode: ThemeMode) => {
    setThemeModeState(newMode);
  }, []);

  const mergedTheme = useMemo<UIThemeContextType>(() => {
    const baseTheme = isDark ? darkTheme : lightTheme;
    const merged = customTheme ? deepMerge(baseTheme, customTheme) : baseTheme;

    return {
      ...merged,
      mode: effectiveMode,
      isDark,
      themeMode,
      toggleThemeMode,
      setThemeMode,
    };
  }, [
    customTheme,
    effectiveMode,
    isDark,
    themeMode,
    toggleThemeMode,
    setThemeMode,
  ]);

  return (
    <UIContext.Provider value={mergedTheme}>{children}</UIContext.Provider>
  );
}

export function useTheme(): UIThemeContextType {
  const context = useContext(UIContext);
  return context || fallbackContext;
}
