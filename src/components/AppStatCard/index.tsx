import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { AppCard } from '../AppCard';

export interface AppStatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function AppStatCard({
  title,
  value,
  trend,
  trendDirection = 'up',
  icon,
  style,
}: AppStatCardProps) {
  const { colors, spacing } = useTheme();

  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up':
        return colors.success;
      case 'down':
        return colors.error;
      case 'neutral':
      default:
        return colors.textSecondary;
    }
  };

  return (
    <AppCard style={style}>
      <View style={styles.header}>
        <AppText variant="caption" weight="medium" color={colors.textSecondary}>
          {title}
        </AppText>
        {Boolean(icon) && <View style={styles.icon}>{icon}</View>}
      </View>

      <View style={[styles.content, { marginTop: spacing.xs }]}>
        <AppText variant="h3" weight="bold" color={colors.text}>
          {value}
        </AppText>

        {Boolean(trend) && (
          <View style={[styles.trendBadge, { marginTop: spacing.xs }]}>
            <AppText variant="caption" weight="bold" color={getTrendColor()}>
              {trendDirection === 'up'
                ? '↑ '
                : trendDirection === 'down'
                  ? '↓ '
                  : ''}
              {trend}
            </AppText>
          </View>
        )}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    width: '100%',
  },
  icon: {
    opacity: 0.8,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
