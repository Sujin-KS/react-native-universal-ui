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

export interface AppTooltipProps {
  text: string;
  position?: 'top' | 'bottom';
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AppTooltip({
  text,
  position = 'top',
  children,
  style,
  textStyle,
}: AppTooltipProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      {visible && (
        <View
          style={[
            styles.bubble,
            shadows.md,
            {
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.sm,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.sm,
              [position === 'top' ? 'bottom' : 'top']: '105%',
            },
            style,
          ]}
        >
          <AppText
            variant="caption"
            weight="medium"
            color={colors.text}
            style={textStyle}
          >
            {text}
          </AppText>
        </View>
      )}

      <Pressable
        onPress={() => setVisible((prev) => !prev)}
        onLongPress={() => setVisible(true)}
      >
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  bubble: {
    position: 'absolute',
    zIndex: 9999,
    minWidth: 60,
    alignItems: 'center',
  },
});
