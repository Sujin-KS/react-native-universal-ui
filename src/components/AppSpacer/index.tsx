import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { UISpacing } from '../../theme/spacing';

export interface AppSpacerProps {
  size?: keyof UISpacing | number;
  horizontal?: boolean;
  style?: ViewStyle;
}

export function AppSpacer({
  size = 'md',
  horizontal = false,
  style,
}: AppSpacerProps) {
  const { spacing } = useTheme();

  const dimension =
    typeof size === 'number' ? size : (spacing[size] ?? spacing.md);

  return (
    <View
      style={[
        horizontal
          ? { width: dimension, height: 1 }
          : { height: dimension, width: 1 },
        style,
      ]}
    />
  );
}
