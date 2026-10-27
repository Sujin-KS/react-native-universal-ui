import React, { useState } from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export interface AppMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  style?: ViewStyle;
}

export function AppMenu({ trigger, items, style }: AppMenuProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setVisible(true)}>{trigger}</Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View
            style={[
              styles.menuCard,
              shadows.lg,
              {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.md,
                paddingVertical: spacing.xs,
              },
              style,
            ]}
          >
            {items.map((item) => (
              <Pressable
                key={item.key}
                disabled={item.disabled}
                onPress={() => {
                  setVisible(false);
                  item.onPress();
                }}
                style={({ pressed }) => [
                  styles.itemRow,
                  {
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                    backgroundColor: pressed
                      ? colors.background
                      : 'transparent',
                    opacity: item.disabled ? 0.4 : 1,
                  },
                ]}
              >
                {Boolean(item.icon) && (
                  <View style={{ marginRight: spacing.sm }}>{item.icon}</View>
                )}
                <AppText
                  variant="body2"
                  weight="medium"
                  color={item.danger ? colors.error : colors.text}
                >
                  {item.label}
                </AppText>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  menuCard: {
    width: 200,
    maxWidth: '80%',
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
