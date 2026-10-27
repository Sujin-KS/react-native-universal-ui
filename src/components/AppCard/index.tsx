import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type AppCardVariant = 'elevated' | 'outlined' | 'filled';

export interface AppCardProps {
  variant?: AppCardVariant;
  padding?: number;
  radius?: number;
  onPress?: (event: GestureResponderEvent) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function AppCard({
  variant = 'elevated',
  padding,
  radius,
  onPress,
  header,
  footer,
  children,
  style,
  testID,
}: AppCardProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  const pad = padding ?? spacing.md;
  const rad = radius ?? borderRadius.lg;

  let backgroundColor = colors.card;
  let borderColor = 'transparent';
  let borderWidth = 0;
  let shadowStyle = {};

  switch (variant) {
    case 'elevated':
      backgroundColor = colors.card;
      shadowStyle = shadows.md;
      break;
    case 'outlined':
      backgroundColor = colors.surface;
      borderColor = colors.border;
      borderWidth = 1;
      break;
    case 'filled':
      backgroundColor = colors.primaryLight;
      break;
  }

  const content = (
    <>
      {header && (
        <View style={[styles.header, { paddingBottom: spacing.sm }]}>
          {header}
        </View>
      )}
      <View style={styles.body}>{children}</View>
      {footer && (
        <View style={[styles.footer, { paddingTop: spacing.sm }]}>
          {footer}
        </View>
      )}
    </>
  );

  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius: rad,
    borderColor,
    borderWidth,
    padding: pad,
  };

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          cardStyle,
          shadowStyle,
          { opacity: pressed ? 0.9 : 1 },
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      testID={testID}
      style={[styles.container, cardStyle, shadowStyle, style]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    width: '100%',
  },
  body: {
    width: '100%',
  },
  footer: {
    width: '100%',
  },
});
