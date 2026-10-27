import { useEffect, useRef } from 'react';
import {
  Pressable,
  Animated,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

export function AppSwitch({
  value,
  onValueChange,
  label,
  disabled = false,
  activeColor,
  inactiveColor,
  thumbColor,
  size = 'md',
  style,
  labelStyle,
  testID,
}: AppSwitchProps) {
  const { colors, spacing, borderRadius } = useTheme();

  const dimensions = {
    sm: { width: 40, height: 22, thumbSize: 18, offset: 18 },
    md: { width: 50, height: 28, thumbSize: 22, offset: 22 },
    lg: { width: 60, height: 34, thumbSize: 28, offset: 26 },
  }[size];

  const translateX = useRef(
    new Animated.Value(value ? dimensions.offset : 2)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? dimensions.offset : 2,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value, dimensions.offset, translateX]);

  const onToggle = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const currentTrackColor = value
    ? (activeColor ?? colors.primary)
    : (inactiveColor ?? colors.border);

  const currentThumbColor = thumbColor ?? colors.white;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={onToggle}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.track,
          {
            width: dimensions.width,
            height: dimensions.height,
            borderRadius: borderRadius.full,
            backgroundColor: disabled
              ? colors.disabledBackground
              : currentTrackColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: dimensions.thumbSize,
              height: dimensions.thumbSize,
              borderRadius: borderRadius.full,
              backgroundColor: currentThumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>

      {Boolean(label) && (
        <AppText
          variant="body2"
          weight="medium"
          color={disabled ? colors.disabled : colors.text}
          style={[{ marginLeft: spacing.sm }, labelStyle]}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
});
