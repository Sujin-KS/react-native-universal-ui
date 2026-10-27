import { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  type ImageSourcePropType,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';

export type AppAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AppAvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AppAvatarSize | number;
  rounded?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AppAvatar({
  source,
  name,
  size = 'md',
  rounded = true,
  status,
  style,
  textStyle,
}: AppAvatarProps) {
  const { colors, borderRadius } = useTheme();
  const [imageError, setImageError] = useState(false);

  const sizeMap: Record<AppAvatarSize, number> = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 52,
    xl: 64,
  };

  const dim = typeof size === 'number' ? size : sizeMap[size] || 40;
  const rad = rounded ? dim / 2 : borderRadius.md;

  const getInitials = (str?: string) => {
    if (!str) return '?';
    const parts = str.trim().split(' ');
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return colors.success;
      case 'busy':
        return colors.error;
      case 'away':
        return colors.warning;
      case 'offline':
      default:
        return colors.disabled;
    }
  };

  const statusDim = Math.max(8, Math.round(dim * 0.25));

  return (
    <View style={[styles.wrapper, { width: dim, height: dim }, style]}>
      <View
        style={[
          styles.container,
          {
            width: dim,
            height: dim,
            borderRadius: rad,
            backgroundColor: colors.primaryLight,
          },
        ]}
      >
        {source && !imageError ? (
          <Image
            source={source}
            onError={() => setImageError(true)}
            style={{ width: dim, height: dim, borderRadius: rad }}
            resizeMode="cover"
          />
        ) : (
          <AppText
            variant={dim > 44 ? 'h6' : 'caption'}
            weight="bold"
            color={colors.primary}
            style={textStyle}
          >
            {getInitials(name)}
          </AppText>
        )}
      </View>

      {Boolean(status) && (
        <View
          style={[
            styles.statusDot,
            {
              width: statusDim,
              height: statusDim,
              borderRadius: statusDim / 2,
              backgroundColor: getStatusColor(),
              borderColor: colors.surface,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
});
