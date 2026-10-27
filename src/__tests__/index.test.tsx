import { describe, it, expect } from '@jest/globals';
import {
  multiply,
  defaultTheme,
  lightColors,
  darkColors,
  deepMerge,
  AppButton,
  AppText,
  AppInput,
  AppCard,
} from '../index';

describe('react-native-universal-ui', () => {
  it('multiplies numbers correctly', () => {
    expect(multiply(3, 7)).toBe(21);
  });

  it('provides default emerald green theme tokens', () => {
    expect(defaultTheme.colors.primary).toBe('#166534');
    expect(defaultTheme.colors.background).toBe('#F0FDF4');
    expect(lightColors.primary).toBe('#166534');
    expect(darkColors.primary).toBe('#22C55E');
  });

  it('deep merges custom theme overrides correctly', () => {
    const custom = {
      colors: {
        primary: '#059669',
      },
    };
    const merged = deepMerge(defaultTheme, custom);
    expect(merged.colors.primary).toBe('#059669');
    expect(merged.colors.background).toBe(defaultTheme.colors.background);
    expect(merged.spacing.md).toBe(defaultTheme.spacing.md);
  });

  it('exports core components properly', () => {
    expect(AppButton).toBeDefined();
    expect(AppText).toBeDefined();
    expect(AppInput).toBeDefined();
    expect(AppCard).toBeDefined();
  });
});
