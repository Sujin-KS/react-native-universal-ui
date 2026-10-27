import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface AppSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  circle?: boolean;
  style?: ViewStyle;
}

export function AppSkeleton({
  width = '100%',
  height = 20,
  borderRadius,
  circle = false,
  style,
}: AppSkeletonProps) {
  const { colors, borderRadius: themeRadius } = useTheme();
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacityAnim]);

  const rad = circle
    ? 9999
    : borderRadius !== undefined
      ? borderRadius
      : themeRadius.sm;

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height: circle && typeof width === 'number' ? width : height,
          borderRadius: rad,
          backgroundColor: colors.disabledBackground,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});
