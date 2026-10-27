import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  style?: ViewStyle;
}

export function AppBreadcrumbs({
  items,
  separator,
  style,
}: AppBreadcrumbsProps) {
  const { colors, spacing } = useTheme();

  const defaultSeparator = (
    <View style={{ marginHorizontal: spacing.xs }}>
      <UIIcon name="chevron-right" size={10} color={colors.textSecondary} />
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={item.label} style={styles.itemWrapper}>
            <Pressable
              disabled={isLast || !item.onPress}
              onPress={item.onPress}
            >
              <AppText
                variant="caption"
                weight={isLast ? 'bold' : 'regular'}
                color={isLast ? colors.text : colors.textSecondary}
              >
                {item.label}
              </AppText>
            </Pressable>

            {!isLast && (separator || defaultSeparator)}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
