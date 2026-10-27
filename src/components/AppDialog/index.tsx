import React from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';

export interface AppDialogProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  confirmVariant?: 'primary' | 'danger';
  confirmLoading?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  children?: React.ReactNode;
}

export function AppDialog({
  visible,
  onDismiss,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  confirmVariant = 'primary',
  confirmLoading = false,
  style,
  titleStyle,
  messageStyle,
  children,
}: AppDialogProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
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
            <AppText
              variant="h5"
              weight="bold"
              color={colors.text}
              style={[{ marginBottom: spacing.xs }, titleStyle]}
            >
              {title}
            </AppText>
          )}

          {Boolean(message) && (
            <AppText
              variant="body2"
              color={colors.textSecondary}
              style={[{ marginBottom: spacing.md }, messageStyle]}
            >
              {message}
            </AppText>
          )}

          {children}

          <View
            style={[
              styles.actionsRow,
              { marginTop: spacing.lg, gap: spacing.sm },
            ]}
          >
            {Boolean(cancelText) && (
              <AppButton
                title={cancelText}
                variant="ghost"
                onPress={onDismiss}
                style={{ flex: 1 }}
              />
            )}
            {Boolean(confirmText && onConfirm) && (
              <AppButton
                title={confirmText}
                variant={confirmVariant}
                loading={confirmLoading}
                onPress={onConfirm}
                style={{ flex: 1 }}
              />
            )}
          </View>
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
    maxWidth: 420,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
});
