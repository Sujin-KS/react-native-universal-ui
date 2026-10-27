import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UIIcon } from '../../utils/icons';
import { AppText } from '../AppText';

export interface AppSearchInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  loading?: boolean;
  showCancel?: boolean;
  onCancel?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}

export function AppSearchInput({
  value: controlledValue,
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  loading = false,
  showCancel = false,
  onCancel,
  style,
  inputStyle,
  testID,
}: AppSearchInputProps) {
  const { colors, spacing, borderRadius } = useTheme();
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');

  const val = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (!onSearch) return;

    const handler = setTimeout(() => {
      onSearch(val);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [val, debounceMs, onSearch]);

  const handleChange = (text: string) => {
    if (controlledValue === undefined) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  };

  const handleClear = () => {
    handleChange('');
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: borderRadius.full,
            paddingHorizontal: spacing.sm * 1.5,
          },
        ]}
      >
        <UIIcon name="search" size={18} color={colors.textSecondary} />

        <TextInput
          testID={testID}
          value={val}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          returnKeyType="search"
          onSubmitEditing={() => onSearch?.(val)}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: 15,
              marginLeft: spacing.xs,
              marginRight: spacing.xs,
            },
            inputStyle,
          ]}
        />

        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : val.length > 0 ? (
          <Pressable onPress={handleClear} hitSlop={8}>
            <UIIcon name="close" size={14} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      {showCancel && (
        <Pressable
          onPress={() => {
            handleClear();
            onCancel?.();
          }}
          style={{ marginLeft: spacing.sm }}
        >
          <AppText variant="body2" color={colors.primary} weight="medium">
            Cancel
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 44,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
