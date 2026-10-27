import { useRef, useState } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
  testID?: string;
}

export function AppSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  activeColor,
  inactiveColor,
  style,
  testID,
}: AppSliderProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const [trackWidth, setTrackWidth] = useState(0);

  const trackRef = useRef<any>(null);

  const clampValue = (val: number) => Math.min(Math.max(val, min), max);

  const roundToStep = (val: number) => {
    if (step <= 0) return val;
    const stepped = Math.round((val - min) / step) * step + min;
    return Math.round(stepped * 1000) / 1000;
  };

  const handleTouch = (pageX: number) => {
    if (disabled || trackWidth <= 0 || !trackRef.current) return;

    trackRef.current.measure(
      (
        _x: number,
        _y: number,
        width: number,
        _height: number,
        pageXOffset: number
      ) => {
        const touchX = pageX - pageXOffset;
        const ratio = Math.max(0, Math.min(1, touchX / width));
        const rawVal = min + ratio * (max - min);
        const finalVal = clampValue(roundToStep(rawVal));
        onValueChange(finalVal);
      }
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => handleTouch(evt.nativeEvent.pageX),
      onPanResponderMove: (evt) => handleTouch(evt.nativeEvent.pageX),
    })
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const progress = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const thumbOffset = progress * trackWidth;

  const currentActiveColor = activeColor ?? colors.primary;
  const currentInactiveColor = inactiveColor ?? colors.border;

  return (
    <View testID={testID} style={[styles.wrapper, style]}>
      {showValue && (
        <View style={[styles.valueHeader, { marginBottom: spacing.xs }]}>
          <AppText
            variant="caption"
            weight="semiBold"
            color={colors.textSecondary}
          >
            {value}
          </AppText>
        </View>
      )}

      <View
        ref={trackRef}
        onLayout={onLayout}
        {...panResponder.panHandlers}
        style={styles.trackContainer}
      >
        <View
          style={[
            styles.track,
            {
              backgroundColor: disabled
                ? colors.disabledBackground
                : currentInactiveColor,
              borderRadius: borderRadius.full,
            },
          ]}
        >
          <View
            style={[
              styles.fill,
              {
                width: `${progress * 100}%`,
                backgroundColor: disabled
                  ? colors.disabled
                  : currentActiveColor,
                borderRadius: borderRadius.full,
              },
            ]}
          />
        </View>

        <View
          style={[
            styles.thumb,
            shadows.sm,
            {
              left: Math.max(0, Math.min(trackWidth - 24, thumbOffset - 12)),
              backgroundColor: disabled ? colors.disabled : colors.white,
              borderColor: currentActiveColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: 8,
  },
  valueHeader: {
    alignItems: 'flex-end',
  },
  trackContainer: {
    height: 36,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 6,
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    top: 6,
  },
});
