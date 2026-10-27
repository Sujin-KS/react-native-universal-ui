import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppSegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AppSegmentedControl({
  options,
  selectedIndex,
  onChange,
  style,
  textStyle,
}: AppSegmentedControlProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderRadius: borderRadius.md,
          padding: 3,
        },
        style,
      ]}
    >
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;

        return (
          <Pressable
            key={option}
            onPress={() => onChange(index)}
            style={[
              styles.segment,
              {
                borderRadius: borderRadius.sm,
                backgroundColor: isSelected ? colors.surface : 'transparent',
                paddingVertical: spacing.xs * 1.5,
              },
              isSelected ? shadows.sm : null,
            ]}
          >
            <AppText
              variant="body2"
              weight={isSelected ? 'bold' : 'regular'}
              color={isSelected ? colors.primary : colors.textSecondary}
              align="center"
              style={textStyle}
            >
              {option}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
