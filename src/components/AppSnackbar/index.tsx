import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppSnackbarProps {
  visible: boolean;
  message: string;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  duration?: number;
  bottomOffset?: number;
  style?: ViewStyle;
}

export function AppSnackbar({
  visible,
  message,
  actionText,
  onAction,
  onDismiss,
  duration = 4000,
  bottomOffset = 24,
  style,
}: AppSnackbarProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0 && onDismiss) {
        const timer = setTimeout(() => {
          onDismiss();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
    return undefined;
  }, [visible, duration, onDismiss, translateY, opacity]);

  if (!visible) return null;

  return (
    <Animated.View
      accessibilityRole="alert"
      style={[
        styles.container,
        shadows.md,
        {
          bottom: bottomOffset,
          backgroundColor: colors.surfaceElevated,
          borderRadius: borderRadius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm * 1.5,
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      <AppText
        variant="body2"
        color={colors.text}
        numberOfLines={2}
        style={{ flex: 1 }}
      >
        {message}
      </AppText>

      {Boolean(actionText && onAction) && (
        <Pressable
          onPress={() => {
            onAction?.();
            onDismiss?.();
          }}
          style={{ marginLeft: spacing.md }}
        >
          <AppText variant="button" weight="bold" color={colors.accent}>
            {actionText}
          </AppText>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9999,
  },
});
