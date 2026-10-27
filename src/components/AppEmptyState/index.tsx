import React from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';

export interface AppEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

export function AppEmptyState({
  icon,
  title,
  description,
  actionTitle,
  onAction,
  style,
  titleStyle,
  descriptionStyle,
}: AppEmptyStateProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xl }, style]}>
      {Boolean(icon) && (
        <View style={{ marginBottom: spacing.md }}>{icon}</View>
      )}

      <AppText
        variant="h5"
        weight="bold"
        color={colors.text}
        align="center"
        style={titleStyle}
      >
        {title}
      </AppText>

      {Boolean(description) && (
        <AppText
          variant="body2"
          color={colors.textSecondary}
          align="center"
          style={[{ marginTop: spacing.xs, maxWidth: 300 }, descriptionStyle]}
        >
          {description}
        </AppText>
      )}

      {Boolean(actionTitle && onAction) && (
        <View style={{ marginTop: spacing.lg }}>
          <AppButton title={actionTitle} onPress={onAction} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
