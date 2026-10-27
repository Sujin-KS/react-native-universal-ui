import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AppChip({
  label,
  selected = false,
  onPress,
  onDelete,
  icon,
  disabled = false,
  color,
  variant = 'filled',
  size = 'md',
  style,
  textStyle,
}: AppChipProps) {
  const { colors, spacing, borderRadius } = useTheme();

  const activeColor = color ?? colors.primary;

  const isOutlined = variant === 'outlined';

  const backgroundColor = selected
    ? activeColor
    : isOutlined
      ? 'transparent'
      : colors.background;

  const borderColor = selected
    ? activeColor
    : isOutlined
      ? colors.border
      : 'transparent';

  const textColor = selected
    ? colors.white
    : disabled
      ? colors.disabled
      : colors.text;

  const padVertical = size === 'sm' ? spacing.xs * 0.75 : spacing.xs * 1.25;
  const padHorizontal = size === 'sm' ? spacing.sm : spacing.md;

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor,
          borderColor,
          borderWidth: 1,
          borderRadius: borderRadius.full,
          paddingVertical: padVertical,
          paddingHorizontal: padHorizontal,
          opacity: pressed && !disabled ? 0.8 : disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {Boolean(icon) && <View style={{ marginRight: spacing.xs }}>{icon}</View>}

      <AppText
        variant="caption"
        weight={selected ? 'bold' : 'medium'}
        style={[{ color: textColor }, textStyle]}
      >
        {label}
      </AppText>

      {Boolean(onDelete) && (
        <Pressable
          onPress={onDelete}
          hitSlop={6}
          style={{ marginLeft: spacing.xs }}
        >
          <UIIcon
            name="close"
            size={12}
            color={selected ? colors.white : colors.textSecondary}
          />
        </Pressable>
      )}
    </Pressable>
  );
}

export interface AppTagProps extends Omit<AppChipProps, 'onDelete'> {}

export function AppTag(props: AppTagProps) {
  return <AppChip size="sm" {...props} />;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
