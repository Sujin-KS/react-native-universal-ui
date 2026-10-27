import { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppFormField } from '../AppFormField';
import { AppText } from '../AppText';

export interface AppTextAreaProps extends Omit<
  TextInputProps,
  'style' | 'multiline'
> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  showCount?: boolean;
  maxLength?: number;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const AppTextArea = forwardRef<any, AppTextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      disabled = false,
      rows = 4,
      showCount = false,
      maxLength,
      containerStyle,
      inputContainerStyle,
      inputStyle,
      labelStyle,
      placeholderTextColor,
      value,
      onChangeText,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const { colors, spacing, borderRadius } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const hasError = Boolean(error);
    const borderColor = hasError
      ? colors.error
      : isFocused
        ? colors.primary
        : colors.border;

    const minHeight = rows * 24 + spacing.md;
    const currentLength = (value ?? '').length;

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
        <View
          style={[
            styles.container,
            {
              backgroundColor: disabled
                ? colors.disabledBackground
                : colors.surface,
              borderRadius: borderRadius.md,
              borderColor,
              borderWidth: 1,
              padding: spacing.sm,
              minHeight,
            },
            inputContainerStyle,
          ]}
        >
          <TextInput
            ref={ref}
            multiline
            textAlignVertical="top"
            editable={!disabled}
            value={value}
            maxLength={maxLength}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor ?? colors.placeholder}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            style={[
              styles.input,
              {
                color: disabled ? colors.disabled : colors.text,
                fontSize: 15,
                minHeight: minHeight - spacing.md,
              },
              inputStyle,
            ]}
            {...rest}
          />

          {showCount && (
            <View style={styles.counterRow}>
              <AppText variant="caption" color={colors.textSecondary}>
                {currentLength}
                {maxLength ? ` / ${maxLength}` : ''}
              </AppText>
            </View>
          )}
        </View>
      </AppFormField>
    );
  }
);

AppTextArea.displayName = 'AppTextArea';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    padding: 0,
    width: '100%',
  },
  counterRow: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
});
