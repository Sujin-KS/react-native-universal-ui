import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type GestureResponderEvent,
} from 'react-native';
import { AppText } from '../AppText';
import { useTheme } from '../../theme/ThemeProvider';

export type AppButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type AppButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps {
  title?: string;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  testID?: string;
  accessibilityLabel?: string;
}

export function AppButton({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onPress,
  style,
  textStyle,
  children,
  testID,
  accessibilityLabel,
}: AppButtonProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  const isDisabled = disabled || loading;

  const sizeStyles: Record<
    AppButtonSize,
    {
      paddingVertical: number;
      paddingHorizontal: number;
      fontSize: number;
      gap: number;
    }
  > = {
    sm: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      fontSize: 13,
      gap: spacing.xs,
    },
    md: {
      paddingVertical: spacing.sm * 1.2,
      paddingHorizontal: spacing.md,
      fontSize: 15,
      gap: spacing.sm,
    },
    lg: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      fontSize: 17,
      gap: spacing.sm,
    },
  };

  const currentSize = sizeStyles[size];

  let backgroundColor = colors.primary;
  let textColor = colors.white;
  let borderColor = 'transparent';
  let borderWidth = 0;

  switch (variant) {
    case 'secondary':
      backgroundColor = colors.secondary;
      textColor = colors.white;
      break;
    case 'outline':
      backgroundColor = 'transparent';
      textColor = colors.primary;
      borderColor = colors.primary;
      borderWidth = 1.5;
      break;
    case 'ghost':
      backgroundColor = 'transparent';
      textColor = colors.primary;
      break;
    case 'danger':
      backgroundColor = colors.error;
      textColor = colors.white;
      break;
    case 'primary':
    default:
      backgroundColor = colors.primary;
      textColor = colors.white;
      break;
  }

  if (isDisabled) {
    if (variant === 'outline' || variant === 'ghost') {
      backgroundColor = 'transparent';
      textColor = colors.disabled;
      borderColor = colors.disabled;
    } else {
      backgroundColor = colors.disabledBackground;
      textColor = colors.disabled;
    }
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={accessibilityLabel || title}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          borderRadius: borderRadius.md,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          columnGap: currentSize.gap,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: pressed && !isDisabled ? 0.85 : 1,
        },
        variant === 'primary' && !isDisabled ? shadows.sm : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <>
          {leftIcon}
          {Boolean(title) && (
            <AppText
              variant="button"
              weight="semiBold"
              style={[
                {
                  color: textColor,
                  fontSize: currentSize.fontSize,
                },
                textStyle,
              ]}
            >
              {title}
            </AppText>
          )}
          {children}
          {rightIcon}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
