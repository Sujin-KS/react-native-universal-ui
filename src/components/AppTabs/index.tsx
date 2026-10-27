import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface TabItem {
  key: string;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

export interface AppTabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  scrollable?: boolean;
  style?: ViewStyle;
  tabStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export function AppTabs({
  tabs,
  activeKey,
  onChange,
  scrollable = false,
  style,
  tabStyle,
  textStyle,
}: AppTabsProps) {
  const { colors, spacing } = useTheme();

  const content = tabs.map((tab) => {
    const isActive = tab.key === activeKey;

    return (
      <Pressable
        key={tab.key}
        onPress={() => onChange(tab.key)}
        style={[
          styles.tab,
          {
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            borderBottomColor: isActive ? colors.primary : 'transparent',
            borderBottomWidth: 2,
          },
          tabStyle,
        ]}
      >
        <View style={styles.tabContent}>
          {Boolean(tab.icon) && (
            <View style={{ marginRight: spacing.xs }}>{tab.icon}</View>
          )}

          <AppText
            variant="body2"
            weight={isActive ? 'bold' : 'medium'}
            color={isActive ? colors.primary : colors.textSecondary}
            style={textStyle}
          >
            {tab.label}
          </AppText>

          {tab.badge !== undefined && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: isActive
                    ? colors.primary
                    : colors.disabledBackground,
                  marginLeft: spacing.xs,
                },
              ]}
            >
              <AppText
                variant="caption"
                weight="bold"
                color={isActive ? colors.white : colors.textSecondary}
                style={{ fontSize: 10, lineHeight: 12 }}
              >
                {tab.badge}
              </AppText>
            </View>
          )}
        </View>
      </Pressable>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, style]}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, styles.fixedContainer, style]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  fixedContainer: {
    width: '100%',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
});
