import React from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export type AppBadgeVariant =
  'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface AppBadgeProps {
  count?: number;
  maxCount?: number;
  dot?: boolean;
  text?: string;
  variant?: AppBadgeVariant;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export function AppBadge({
  count,
  maxCount = 99,
  dot = false,
  text,
  variant = 'primary',
  color,
  textColor,
  style,
  textStyle,
  children,
}: AppBadgeProps) {
  const { colors, borderRadius } = useTheme();

  const getBgColor = () => {
    if (color) return color;
    switch (variant) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
        return colors.info;
      case 'neutral':
        return colors.disabled;
      case 'primary':
      default:
        return colors.primary;
    }
  };

  const displayText = text
    ? text
    : count !== undefined
      ? count > maxCount
        ? `${maxCount}+`
        : `${count}`
      : '';

  const badgeElement = (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getBgColor(),
          borderRadius: borderRadius.full,
          minWidth: dot ? 8 : 18,
          height: dot ? 8 : 18,
          paddingHorizontal: dot ? 0 : 5,
        },
        children ? styles.anchored : null,
        style,
      ]}
    >
      {!dot && Boolean(displayText) && (
        <AppText
          variant="caption"
          weight="bold"
          style={[
            {
              color: textColor || colors.white,
              fontSize: 10,
              lineHeight: 12,
              textAlign: 'center',
            },
            textStyle,
          ]}
        >
          {displayText}
        </AppText>
      )}
    </View>
  );

  if (children) {
    return (
      <View style={styles.anchorWrapper}>
        {children}
        {badgeElement}
      </View>
    );
  }

  return badgeElement;
}

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  anchorWrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  anchored: {
    position: 'absolute',
    top: -4,
    right: -4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
});
