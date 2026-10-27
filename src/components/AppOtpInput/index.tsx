import { useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type NativeSyntheticEvent,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface AppOtpInputProps {
  length?: number;
  value: string;
  onValueChange: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  pinStyle?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function AppOtpInput({
  length = 6,
  value,
  onValueChange,
  disabled = false,
  error = false,
  secureTextEntry = false,
  style,
  pinStyle,
  textStyle,
  testID,
}: AppOtpInputProps) {
  const { colors, spacing, borderRadius } = useTheme();
  const inputsRef = useRef<any[]>([]);

  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const handleChange = (text: string, index: number) => {
    // If user pastes multiple digits
    if (text.length > 1) {
      const cleaned = text.replace(/[^0-9a-zA-Z]/g, '').slice(0, length);
      onValueChange(cleaned);
      const focusIndex = Math.min(cleaned.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = text;
    const combined = newDigits.join('').slice(0, length);
    onValueChange(combined);

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<{ key: string }>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View
      testID={testID}
      style={[styles.container, { columnGap: spacing.sm }, style]}
    >
      {Array.from({ length }).map((_, index) => {
        const val = digits[index] || '';
        const isCurrentActive = digits.findIndex((d) => d === '') === index;

        return (
          <TextInput
            key={index}
            ref={(r) => {
              inputsRef.current[index] = r;
            }}
            value={val}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={index === 0 ? length : 1}
            editable={!disabled}
            secureTextEntry={secureTextEntry}
            textAlign="center"
            style={[
              styles.digitBox,
              {
                backgroundColor: disabled
                  ? colors.disabledBackground
                  : colors.surface,
                borderColor: error
                  ? colors.error
                  : isCurrentActive
                    ? colors.primary
                    : colors.border,
                borderRadius: borderRadius.md,
                color: error ? colors.error : colors.text,
              },
              pinStyle,
              textStyle,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  digitBox: {
    width: 44,
    height: 52,
    borderWidth: 1.5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
