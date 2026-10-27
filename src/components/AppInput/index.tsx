import { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  Pressable,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppFormField } from '../AppFormField';
import { UIIcon } from '../../utils/icons';

export type AppInputVariant = 'outlined' | 'filled' | 'underlined';

export interface AppInputProps extends Omit<TextInputProps, 'style'> {
  variant?: AppInputVariant;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const AppInput = forwardRef<any, AppInputProps>(
  (
    {
      variant = 'outlined',
      label,
      error,
      helperText,
      required,
      disabled = false,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
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

    let background = colors.surface;
    let borderWidth = 1;
    let borderBottomOnly = false;

    if (variant === 'filled') {
      background = colors.background;
      borderWidth = 0;
    } else if (variant === 'underlined') {
      background = 'transparent';
      borderWidth = 0;
      borderBottomOnly = true;
    }

    const showClear = clearable && Boolean(value) && !disabled;

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
            styles.inputRow,
            {
              backgroundColor: disabled
                ? colors.disabledBackground
                : background,
              borderRadius: borderBottomOnly ? 0 : borderRadius.md,
              borderColor,
              borderWidth: borderBottomOnly ? 0 : borderWidth,
              borderBottomWidth: borderBottomOnly ? 2 : borderWidth,
              paddingHorizontal: spacing.sm * 1.5,
              paddingVertical: spacing.xs * 1.5,
            },
            inputContainerStyle,
          ]}
        >
          {leftIcon && (
            <View style={{ marginRight: spacing.xs }}>{leftIcon}</View>
          )}

          <TextInput
            ref={ref}
            editable={!disabled}
            value={value}
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
              },
              inputStyle,
            ]}
            {...rest}
          />

          {showClear && (
            <Pressable
              onPress={() => {
                onChangeText?.('');
                onClear?.();
              }}
              hitSlop={8}
              style={{ padding: 4 }}
            >
              <UIIcon name="close" size={14} color={colors.textSecondary} />
            </Pressable>
          )}

          {rightIcon && (
            <View style={{ marginLeft: spacing.xs }}>{rightIcon}</View>
          )}
        </View>
      </AppFormField>
    );
  }
);

AppInput.displayName = 'AppInput';

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 46,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
