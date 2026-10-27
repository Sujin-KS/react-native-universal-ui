import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet, type ViewStyle } from 'react-native';

export interface AppBackdropProps {
  visible: boolean;
  onPress?: () => void;
  opacity?: number;
  color?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function AppBackdrop({
  visible,
  onPress,
  opacity = 0.5,
  color = '#000000',
  style,
  children,
}: AppBackdropProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? opacity : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.backdrop,
        {
          backgroundColor: color,
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      <Pressable style={styles.pressable} onPress={onPress}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
  },
  pressable: {
    flex: 1,
  },
});
