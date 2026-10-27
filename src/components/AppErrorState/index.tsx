import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { AppButton } from '../AppButton';
import { UIIcon } from '../../utils/icons';

export interface AppErrorStateProps {
  title?: string;
  message?: string;
  retryTitle?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export function AppErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  retryTitle = 'Try Again',
  onRetry,
  style,
}: AppErrorStateProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xl }, style]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: colors.errorLight,
            marginBottom: spacing.md,
          },
        ]}
      >
        <UIIcon name="alert" size={32} color={colors.error} />
      </View>

      <AppText variant="h5" weight="bold" color={colors.text} align="center">
        {title}
      </AppText>

      <AppText
        variant="body2"
        color={colors.textSecondary}
        align="center"
        style={{ marginTop: spacing.xs, maxWidth: 300 }}
      >
        {message}
      </AppText>

      {Boolean(onRetry) && (
        <View style={{ marginTop: spacing.lg }}>
          <AppButton title={retryTitle} variant="outline" onPress={onRetry} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
