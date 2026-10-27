import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AppAlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actionText?: string;
  onAction?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
}

export function AppAlert({
  type = 'info',
  title,
  message,
  icon,
  dismissible = false,
  onDismiss,
  actionText,
  onAction,
  style,
  titleStyle,
  messageStyle,
}: AppAlertProps) {
  const { colors, spacing, borderRadius } = useTheme();

  const config = {
    success: {
      bg: colors.successLight,
      border: colors.success,
      text: colors.success,
      defaultIcon: <UIIcon name="check" size={18} color={colors.success} />,
    },
    error: {
      bg: colors.errorLight,
      border: colors.error,
      text: colors.error,
      defaultIcon: <UIIcon name="alert" size={18} color={colors.error} />,
    },
    warning: {
      bg: colors.warningLight,
      border: colors.warning,
      text: colors.warning,
      defaultIcon: <UIIcon name="alert" size={18} color={colors.warning} />,
    },
    info: {
      bg: colors.infoLight,
      border: colors.info,
      text: colors.info,
      defaultIcon: <UIIcon name="info" size={18} color={colors.info} />,
    },
  }[type];

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.container,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          borderRadius: borderRadius.md,
          padding: spacing.sm * 1.5,
        },
        style,
      ]}
    >
      <View style={{ marginRight: spacing.sm, marginTop: 1 }}>
        {icon || config.defaultIcon}
      </View>

      <View style={{ flex: 1 }}>
        {Boolean(title) && (
          <AppText
            variant="body2"
            weight="bold"
            color={config.text}
            style={titleStyle}
          >
            {title}
          </AppText>
        )}
        <AppText
          variant="caption"
          color={colors.text}
          style={[{ marginTop: title ? 2 : 0 }, messageStyle]}
        >
          {message}
        </AppText>

        {Boolean(actionText && onAction) && (
          <Pressable onPress={onAction} style={{ marginTop: spacing.xs }}>
            <AppText variant="caption" weight="bold" color={config.text}>
              {actionText}
            </AppText>
          </Pressable>
        )}
      </View>

      {dismissible && (
        <Pressable
          onPress={onDismiss}
          hitSlop={8}
          style={{ marginLeft: spacing.xs }}
        >
          <UIIcon name="close" size={14} color={config.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    width: '100%',
  },
});
