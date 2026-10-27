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

export interface AppListItemProps {
  title: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export function AppListItem({
  title,
  subtitle,
  left,
  right,
  showChevron = false,
  onPress,
  disabled = false,
  style,
  titleStyle,
  subtitleStyle,
}: AppListItemProps) {
  const { colors, spacing } = useTheme();

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          paddingVertical: spacing.sm * 1.5,
          paddingHorizontal: spacing.md,
          backgroundColor:
            pressed && !disabled ? colors.background : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {Boolean(left) && <View style={{ marginRight: spacing.md }}>{left}</View>}

      <View style={styles.textContainer}>
        <AppText
          variant="body1"
          weight="medium"
          color={colors.text}
          style={titleStyle}
        >
          {title}
        </AppText>
        {Boolean(subtitle) && (
          <AppText
            variant="caption"
            color={colors.textSecondary}
            style={[{ marginTop: 2 }, subtitleStyle]}
          >
            {subtitle}
          </AppText>
        )}
      </View>

      {Boolean(right) && (
        <View style={{ marginLeft: spacing.sm }}>{right}</View>
      )}

      {showChevron && (
        <View style={{ marginLeft: spacing.sm }}>
          <UIIcon name="chevron-right" size={14} color={colors.textSecondary} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flex: 1,
  },
});
