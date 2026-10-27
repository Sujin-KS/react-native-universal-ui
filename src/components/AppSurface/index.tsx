import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type AppSurfaceVariant = 'background' | 'surface' | 'elevated';

export interface AppSurfaceProps {
  variant?: AppSurfaceVariant;
  padding?: number;
  radius?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function AppSurface({
  variant = 'surface',
  padding,
  radius,
  style,
  children,
}: AppSurfaceProps) {
  const { colors, borderRadius, shadows } = useTheme();

  let backgroundColor = colors.surface;
  let shadowStyle = {};

  switch (variant) {
    case 'background':
      backgroundColor = colors.background;
      break;
    case 'elevated':
      backgroundColor = colors.surfaceElevated;
      shadowStyle = shadows.md;
      break;
    case 'surface':
    default:
      backgroundColor = colors.surface;
      break;
  }

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: radius !== undefined ? radius : borderRadius.none,
          padding: padding ?? 0,
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}
