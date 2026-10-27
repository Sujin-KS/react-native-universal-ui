import React, { useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppAccordionProps {
  title: string;
  subtitle?: string;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  children: React.ReactNode;
}

export function AppAccordion({
  title,
  subtitle,
  expanded: controlledExpanded,
  onToggle,
  style,
  titleStyle,
  children,
}: AppAccordionProps) {
  const { colors, spacing, borderRadius } = useTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (controlledExpanded === undefined) {
      setInternalExpanded(!internalExpanded);
    }
    onToggle?.(!isExpanded);
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderRadius: borderRadius.md,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <Pressable
        onPress={handleToggle}
        style={[
          styles.header,
          {
            padding: spacing.md,
          },
        ]}
      >
        <View style={styles.titleWrapper}>
          <AppText
            variant="body1"
            weight="semiBold"
            color={colors.text}
            style={titleStyle}
          >
            {title}
          </AppText>
          {Boolean(subtitle) && (
            <AppText
              variant="caption"
              color={colors.textSecondary}
              style={{ marginTop: 2 }}
            >
              {subtitle}
            </AppText>
          )}
        </View>

        <UIIcon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={colors.textSecondary}
        />
      </Pressable>

      {isExpanded && (
        <View
          style={[
            styles.content,
            {
              paddingHorizontal: spacing.md,
              paddingBottom: spacing.md,
              borderTopColor: colors.divider,
              borderTopWidth: 1,
              paddingTop: spacing.sm,
            },
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flex: 1,
    marginRight: 8,
  },
  content: {
    width: '100%',
  },
});
