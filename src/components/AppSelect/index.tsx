import { useState, useMemo } from 'react';
import {
  View,
  Modal,
  Pressable,
  FlatList,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppFormField } from '../AppFormField';
import { AppText } from '../AppText';
import { AppInput } from '../AppInput';
import { UIIcon } from '../../utils/icons';

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface AppSelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  selectStyle?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

export function AppSelect({
  label,
  placeholder = 'Select an option...',
  value,
  options,
  onSelect,
  searchable = false,
  searchPlaceholder = 'Search...',
  error,
  helperText,
  required,
  disabled = false,
  containerStyle,
  selectStyle,
  labelStyle,
  testID,
}: AppSelectProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    const q = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.description && opt.description.toLowerCase().includes(q))
    );
  }, [options, searchable, searchQuery]);

  const handleSelect = (val: string) => {
    onSelect(val);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <AppFormField
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      disabled={disabled}
      style={containerStyle}
      labelStyle={labelStyle}
    >
      <Pressable
        testID={testID}
        disabled={disabled}
        accessibilityRole="combobox"
        onPress={() => setModalVisible(true)}
        style={[
          styles.selectButton,
          {
            backgroundColor: disabled
              ? colors.disabledBackground
              : colors.surface,
            borderColor: error ? colors.error : colors.border,
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.sm * 1.5,
            paddingVertical: spacing.sm,
          },
          selectStyle,
        ]}
      >
        <AppText
          variant="body1"
          color={selectedOption ? colors.text : colors.placeholder}
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </AppText>
        <UIIcon name="chevron-down" size={16} color={colors.textSecondary} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => {
            setModalVisible(false);
            setSearchQuery('');
          }}
        >
          <Pressable
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.lg,
                padding: spacing.md,
                maxHeight: '75%',
              },
              shadows.lg,
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.modalHeader, { marginBottom: spacing.sm }]}>
              <AppText variant="h5" weight="bold" color={colors.primaryDark}>
                {label || 'Select'}
              </AppText>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  setSearchQuery('');
                }}
                hitSlop={8}
              >
                <UIIcon name="close" size={18} color={colors.textSecondary} />
              </Pressable>
            </View>

            {searchable && (
              <View style={{ marginBottom: spacing.sm }}>
                <AppInput
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  clearable
                  leftIcon={
                    <UIIcon
                      name="search"
                      size={16}
                      color={colors.textSecondary}
                    />
                  }
                />
              </View>
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: colors.divider }} />
              )}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    disabled={item.disabled}
                    onPress={() => handleSelect(item.value)}
                    style={[
                      styles.optionRow,
                      {
                        paddingVertical: spacing.sm * 1.2,
                        paddingHorizontal: spacing.sm,
                        backgroundColor: isSelected
                          ? colors.primaryLight
                          : 'transparent',
                        borderRadius: borderRadius.sm,
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <AppText
                        variant="body1"
                        weight={isSelected ? 'bold' : 'regular'}
                        color={
                          item.disabled
                            ? colors.disabled
                            : isSelected
                              ? colors.primary
                              : colors.text
                        }
                      >
                        {item.label}
                      </AppText>
                      {Boolean(item.description) && (
                        <AppText
                          variant="caption"
                          color={colors.textSecondary}
                          style={{ marginTop: 2 }}
                        >
                          {item.description}
                        </AppText>
                      )}
                    </View>
                    {isSelected && (
                      <UIIcon name="check" size={16} color={colors.primary} />
                    )}
                  </Pressable>
                );
              }}
              ListEmptyComponent={() => (
                <View
                  style={{ paddingVertical: spacing.lg, alignItems: 'center' }}
                >
                  <AppText variant="body2" color={colors.textSecondary}>
                    No options found
                  </AppText>
                </View>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </AppFormField>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    minHeight: 46,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
