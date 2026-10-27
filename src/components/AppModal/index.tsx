import React from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  animationType?: 'none' | 'slide' | 'fade';
  children: React.ReactNode;
  style?: ViewStyle;
}

export function AppModal({
  visible,
  onClose,
  title,
  animationType = 'fade',
  children,
  style,
}: AppModalProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.card,
            shadows.lg,
            {
              backgroundColor: colors.surface,
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
            },
            style,
          ]}
          onPress={(e) => e.stopPropagation()}
        >
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 480,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
