import React from 'react';
import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppFormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  children: React.ReactNode;
}

export function AppFormField({
  label,
  required,
  error,
  helperText,
  disabled,
  style,
  labelStyle,
  children,
}: AppFormFieldProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {Boolean(label) && (
        <View style={[styles.labelRow, { marginBottom: spacing.xs }]}>
          <AppText
            variant="caption"
            weight="medium"
            color={disabled ? colors.disabled : colors.text}
            style={labelStyle}
          >
            {label}
          </AppText>
          {required && (
            <AppText
              variant="caption"
              color={colors.error}
              style={{ marginLeft: 2 }}
            >
              *
            </AppText>
          )}
        </View>
      )}

      {children}

      {Boolean(error) ? (
        <AppText
          variant="caption"
          color={colors.error}
          style={{ marginTop: spacing.xs * 0.75 }}
        >
          {error}
        </AppText>
      ) : Boolean(helperText) ? (
        <AppText
          variant="caption"
          color={colors.textSecondary}
          style={{ marginTop: spacing.xs * 0.75 }}
        >
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
