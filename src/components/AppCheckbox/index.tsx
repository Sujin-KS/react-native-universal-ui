import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppCheckboxProps {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  color?: string;
  size?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

export function AppCheckbox({
  checked,
  onValueChange,
  label,
  description,
  disabled = false,
  color,
  size = 22,
  style,
  labelStyle,
  testID,
}: AppCheckboxProps) {
  const { colors, spacing, borderRadius } = useTheme();

  const activeColor = color ?? colors.primary;

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  return (
    <Pressable
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderRadius: borderRadius.sm,
            borderColor: checked ? activeColor : colors.border,
            backgroundColor: checked
              ? activeColor
              : disabled
                ? colors.disabledBackground
                : colors.surface,
          },
        ]}
      >
        {checked && (
          <UIIcon name="check" size={size * 0.75} color={colors.white} />
        )}
      </View>

      {Boolean(label || description) && (
        <View style={[styles.textWrapper, { marginLeft: spacing.sm }]}>
          {Boolean(label) && (
            <AppText
              variant="body2"
              weight="medium"
              color={disabled ? colors.disabled : colors.text}
              style={labelStyle}
            >
              {label}
            </AppText>
          )}
          {Boolean(description) && (
            <AppText
              variant="caption"
              color={colors.textSecondary}
              style={{ marginTop: 2 }}
            >
              {description}
            </AppText>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
  },
});
