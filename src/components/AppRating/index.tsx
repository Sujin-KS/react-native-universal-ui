import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { UIIcon } from '../../utils/icons';

export interface AppRatingProps {
  value: number;
  max?: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function AppRating({
  value,
  max = 5,
  onChange,
  readonly = false,
  size = 24,
  color,
  style,
}: AppRatingProps) {
  const { colors, spacing } = useTheme();

  const starColor = color ?? colors.warning;

  return (
    <View style={[styles.container, { columnGap: spacing.xs }, style]}>
      {Array.from({ length: max }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= value;

        const starElement = (
          <UIIcon
            name={isFilled ? 'star-filled' : 'star'}
            size={size}
            color={isFilled ? starColor : colors.border}
          />
        );

        if (readonly || !onChange) {
          return <View key={index}>{starElement}</View>;
        }

        return (
          <Pressable
            key={index}
            onPress={() => onChange(starNumber)}
            hitSlop={4}
          >
            {starElement}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
