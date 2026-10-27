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
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: number | string;
  style?: ViewStyle;
}

export function AppBottomSheet({
  visible,
  onClose,
  title,
  children,
  style,
}: AppBottomSheetProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 500,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, translateY]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View
          style={[
            styles.sheet,
            shadows.xl,
            {
              backgroundColor: colors.surface,
              borderTopLeftRadius: borderRadius.xl,
              borderTopRightRadius: borderRadius.xl,
              padding: spacing.md,
              transform: [{ translateY }],
            },
            style,
          ]}
          onStartShouldSetResponder={() => true}
        >
          {/* Drag Handle */}
          <View style={styles.handleContainer}>
            <View
              style={[
                styles.handle,
                {
                  backgroundColor: colors.border,
                  borderRadius: borderRadius.full,
                },
              ]}
            />
          </View>

          {/* Optional Title Header */}
          {Boolean(title) && (
            <View style={[styles.header, { marginBottom: spacing.md }]}>
              <AppText variant="h6" weight="bold" color={colors.text}>
                {title}
              </AppText>
              <Pressable onPress={onClose} hitSlop={8}>
                <UIIcon name="close" size={16} color={colors.textSecondary} />
              </Pressable>
            </View>
          )}

          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    maxHeight: '85%',
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  handle: {
    width: 36,
    height: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
