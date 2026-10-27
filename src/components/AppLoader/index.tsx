import {
  View,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export interface AppLoaderProps {
  size?: 'small' | 'large' | number;
  color?: string;
  text?: string;
  overlay?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export function AppLoader({
  size = 'large',
  color,
  text,
  overlay = false,
  style,
  textStyle,
  testID,
}: AppLoaderProps) {
  const { colors, spacing } = useTheme();

  const spinnerColor = color ?? colors.primary;

  const content = (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        testID={testID}
        size={typeof size === 'number' ? undefined : size}
        color={spinnerColor}
      />
      {Boolean(text) && (
        <AppText
          variant="body2"
          weight="medium"
          color={colors.textSecondary}
          style={[{ marginTop: spacing.sm }, textStyle]}
        >
          {text}
        </AppText>
      )}
    </View>
  );

  if (overlay) {
    return (
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: 'rgba(0,0,0,0.35)',
          },
        ]}
      >
        <View
          style={[
            styles.overlayBox,
            {
              backgroundColor: colors.surface,
              padding: spacing.lg,
              borderRadius: 12,
            },
          ]}
        >
          {content}
        </View>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  overlayBox: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 100,
  },
});
