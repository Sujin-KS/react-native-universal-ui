import { View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { AppText } from '../AppText';
import { useTheme } from '../../theme/ThemeProvider';
import type { AppTextVariant } from '../AppText';

export interface AppHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  subtitle?: string;
  color?: string;
  subtitleColor?: string;
  align?: TextStyle['textAlign'];
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export function AppHeading({
  level = 1,
  title,
  subtitle,
  color,
  subtitleColor,
  align = 'left',
  style,
  titleStyle,
  subtitleStyle,
}: AppHeadingProps) {
  const { spacing, colors } = useTheme();

  const variantMap: Record<number, AppTextVariant> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  };

  const variant = variantMap[level] || 'h1';

  return (
    <View style={[styles.container, style]}>
      <AppText
        variant={variant}
        color={color ?? colors.primaryDark}
        align={align}
        accessibilityRole="header"
        style={titleStyle}
      >
        {title}
      </AppText>
      {Boolean(subtitle) && (
        <AppText
          variant={level > 3 ? 'caption' : 'body2'}
          color={subtitleColor ?? colors.textSecondary}
          align={align}
          style={[{ marginTop: spacing.xs }, subtitleStyle]}
        >
          {subtitle}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
