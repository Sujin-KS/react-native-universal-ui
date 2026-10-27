import { Text, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { UITypographyVariants } from '../../theme/typography';

export type AppTextVariant = keyof UITypographyVariants;

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  color?: string;
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  align?: TextStyle['textAlign'];
  transform?: TextStyle['textTransform'];
  muted?: boolean;
}

export function AppText({
  variant = 'body1',
  color,
  weight,
  align,
  transform,
  muted,
  style,
  children,
  ...rest
}: AppTextProps) {
  const { colors, typography } = useTheme();

  const fontSize = typography.sizes[variant] ?? typography.sizes.body1;

  let fontWeight: TextStyle['fontWeight'] = typography.weights.regular;
  let fontFamily = typography.fontFamily;

  if (weight) {
    fontWeight = typography.weights[weight];
    if (weight === 'medium') fontFamily = typography.fontFamilyMedium;
    if (weight === 'semiBold') fontFamily = typography.fontFamilySemiBold;
    if (weight === 'bold') fontFamily = typography.fontFamilyBold;
  } else if (variant.startsWith('h')) {
    fontWeight = typography.weights.bold;
    fontFamily = typography.fontFamilyBold;
  } else if (variant === 'button') {
    fontWeight = typography.weights.semiBold;
    fontFamily = typography.fontFamilySemiBold;
  }

  const textColor = color ?? (muted ? colors.textMuted : colors.text);

  const textStyle: TextStyle = {
    fontSize,
    color: textColor,
    fontFamily,
    fontWeight,
    textAlign: align,
    textTransform: transform,
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
