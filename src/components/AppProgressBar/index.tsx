import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppProgressBarProps {
  progress?: number; // 0 to 100
  indeterminate?: boolean;
  color?: string;
  trackColor?: string;
  height?: number;
  showLabel?: boolean;
  style?: ViewStyle;
}

export function AppProgressBar({
  progress = 0,
  indeterminate = false,
  color,
  trackColor,
  height = 8,
  showLabel = false,
  style,
}: AppProgressBarProps) {
  const { colors, borderRadius, spacing } = useTheme();
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(0)).current;

  const clampedProgress = Math.max(0, Math.min(100, progress));

  useEffect(() => {
    if (!indeterminate) {
      Animated.timing(animatedProgress, {
        toValue: clampedProgress,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [clampedProgress, indeterminate, animatedProgress]);

  useEffect(() => {
    if (indeterminate) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(indeterminateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
    return undefined;
  }, [indeterminate, indeterminateAnim]);

  const activeColor = color ?? colors.primary;
  const bgTrack = trackColor ?? colors.border;

  return (
    <View style={[styles.wrapper, style]}>
      {showLabel && (
        <View style={[styles.labelRow, { marginBottom: spacing.xs }]}>
          <AppText
            variant="caption"
            weight="semiBold"
            color={colors.textSecondary}
          >
            {Math.round(clampedProgress)}%
          </AppText>
        </View>
      )}

      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: bgTrack,
            borderRadius: borderRadius.full,
          },
        ]}
      >
        {indeterminate ? (
          <Animated.View
            style={[
              styles.fill,
              {
                width: '40%',
                backgroundColor: activeColor,
                borderRadius: borderRadius.full,
                transform: [
                  {
                    translateX: indeterminateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 300],
                    }),
                  },
                ],
              },
            ]}
          />
        ) : (
          <Animated.View
            style={[
              styles.fill,
              {
                width: animatedProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: activeColor,
                borderRadius: borderRadius.full,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  labelRow: {
    alignItems: 'flex-end',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
