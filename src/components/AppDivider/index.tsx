import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppDividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  label?: string;
  margin?: number;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export function AppDivider({
  orientation = 'horizontal',
  thickness = StyleSheet.hairlineWidth || 1,
  color,
  label,
  margin,
  style,
  labelStyle,
}: AppDividerProps) {
  const { colors, spacing } = useTheme();
  const dividerColor = color ?? colors.divider;
  const m = margin ?? spacing.sm;

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          {
            width: thickness,
            backgroundColor: dividerColor,
            marginHorizontal: m,
            alignSelf: 'stretch',
          },
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View
        style={[
          styles.labelContainer,
          {
            marginVertical: m,
          },
          style,
        ]}
      >
        <View
          style={[
            styles.line,
            { height: thickness, backgroundColor: dividerColor },
          ]}
        />
        <AppText
          variant="caption"
          color={colors.textSecondary}
          style={[{ marginHorizontal: spacing.sm }, labelStyle]}
        >
          {label}
        </AppText>
        <View
          style={[
            styles.line,
            { height: thickness, backgroundColor: dividerColor },
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: dividerColor,
          marginVertical: m,
          width: '100%',
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
  },
});
