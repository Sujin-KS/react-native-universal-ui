import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export type AppIconButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'surface';
export type AppIconButtonSize = 'sm' | 'md' | 'lg';

export interface AppIconButtonProps {
  icon: React.ReactNode;
  variant?: AppIconButtonVariant;
  size?: AppIconButtonSize;
  rounded?: boolean;
  disabled?: boolean;
  badge?: number | string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel: string;
}

export function AppIconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  rounded = true,
  disabled = false,
  badge,
  onPress,
  style,
  testID,
  accessibilityLabel,
}: AppIconButtonProps) {
  const { colors, borderRadius, shadows } = useTheme();

  const sizeDimensions: Record<AppIconButtonSize, number> = {
    sm: 32,
    md: 40,
    lg: 48,
  };

  const dim = sizeDimensions[size];

  let backgroundColor = 'transparent';
  let borderColor = 'transparent';
  let borderWidth = 0;

  switch (variant) {
    case 'primary':
      backgroundColor = colors.primary;
      break;
    case 'secondary':
      backgroundColor = colors.primaryLight;
      break;
    case 'outline':
      borderColor = colors.border;
      borderWidth = 1;
      break;
    case 'surface':
      backgroundColor = colors.surface;
      break;
    case 'ghost':
    default:
      backgroundColor = 'transparent';
      break;
  }

  if (disabled) {
    backgroundColor = colors.disabledBackground;
    borderColor = 'transparent';
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          width: dim,
          height: dim,
          borderRadius: rounded ? borderRadius.full : borderRadius.md,
          backgroundColor,
          borderColor,
          borderWidth,
          opacity: pressed && !disabled ? 0.7 : disabled ? 0.5 : 1,
        },
        variant === 'surface' ? shadows.sm : null,
        style,
      ]}
    >
      {icon}
      {badge !== undefined && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.error,
              borderRadius: borderRadius.full,
              borderColor: colors.surface,
            },
          ]}
        >
          <AppText
            variant="caption"
            weight="bold"
            style={{ color: colors.white, fontSize: 10, lineHeight: 12 }}
          >
            {badge}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
