import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppRadioProps {
  value: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  color?: string;
  size?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

export function AppRadio({
  value,
  selected = false,
  onSelect,
  label,
  description,
  disabled = false,
  color,
  size = 22,
  style,
  labelStyle,
  testID,
}: AppRadioProps) {
  const { colors, spacing, borderRadius } = useTheme();

  const activeColor = color ?? colors.primary;

  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect(value);
    }
  };

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.outerCircle,
          {
            width: size,
            height: size,
            borderRadius: borderRadius.full,
            borderColor: selected ? activeColor : colors.border,
            backgroundColor: disabled
              ? colors.disabledBackground
              : colors.surface,
          },
        ]}
      >
        {selected && (
          <View
            style={[
              styles.innerDot,
              {
                width: size * 0.5,
                height: size * 0.5,
                borderRadius: borderRadius.full,
                backgroundColor: activeColor,
              },
            ]}
          />
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

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface AppRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options?: RadioOption[];
  disabled?: boolean;
  horizontal?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function AppRadioGroup({
  value,
  onValueChange,
  options,
  disabled = false,
  horizontal = false,
  style,
  children,
}: AppRadioGroupProps) {
  const { spacing } = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        horizontal ? styles.row : styles.column,
        { gap: horizontal ? spacing.md : spacing.sm },
        style,
      ]}
    >
      {options
        ? options.map((opt) => (
            <AppRadio
              key={opt.value}
              value={opt.value}
              selected={value === opt.value}
              onSelect={onValueChange}
              label={opt.label}
              description={opt.description}
              disabled={disabled || opt.disabled}
            />
          ))
        : React.Children.map(children, (child) => {
            if (React.isValidElement<AppRadioProps>(child)) {
              return React.cloneElement(child, {
                selected: child.props.value === value,
                onSelect: onValueChange,
                disabled: disabled || child.props.disabled,
              });
            }
            return child;
          })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {},
  textWrapper: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
