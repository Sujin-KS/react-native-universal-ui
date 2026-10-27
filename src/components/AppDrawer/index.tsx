import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface AppDrawerProps {
  visible: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function AppDrawer({
  visible,
  onClose,
  position = 'left',
  width = 280,
  children,
  style,
}: AppDrawerProps) {
  const { colors, shadows } = useTheme();
  const initialOffset = position === 'left' ? -width : width;
  const translateX = useRef(new Animated.Value(initialOffset)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: initialOffset,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, initialOffset, translateX]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View
          style={[
            styles.drawer,
            shadows.xl,
            position === 'left' ? styles.left : styles.right,
            {
              width,
              backgroundColor: colors.surface,
              transform: [{ translateX }],
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});
