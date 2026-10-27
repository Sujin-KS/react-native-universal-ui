import { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  type ImageProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppSkeleton } from '../AppSkeleton';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppImageProps extends Omit<ImageProps, 'style'> {
  aspectRatio?: number;
  radius?: number;
  style?: ViewStyle;
}

export function AppImage({
  aspectRatio,
  radius,
  style,
  source,
  ...rest
}: AppImageProps) {
  const { colors, borderRadius } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const rad = radius !== undefined ? radius : borderRadius.md;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: rad,
          backgroundColor: colors.disabledBackground,
          aspectRatio,
        },
        style,
      ]}
    >
      {loading && !error && (
        <View style={StyleSheet.absoluteFill}>
          <AppSkeleton width="100%" height="100%" borderRadius={rad} />
        </View>
      )}

      {!error && (
        <Image
          source={source}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          style={[styles.image, { borderRadius: rad }]}
          {...rest}
        />
      )}

      {error && (
        <View style={[styles.errorBox, { backgroundColor: colors.background }]}>
          <UIIcon name="alert" size={24} color={colors.textSecondary} />
          <AppText
            variant="caption"
            color={colors.textSecondary}
            style={{ marginTop: 4 }}
          >
            Failed to load
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorBox: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
