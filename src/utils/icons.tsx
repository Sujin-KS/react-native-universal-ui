import { View, type ViewStyle } from 'react-native';

export interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export type IconType =
  | 'check'
  | 'close'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'search'
  | 'eye'
  | 'eye-off'
  | 'star'
  | 'star-filled'
  | 'info'
  | 'alert'
  | 'calendar'
  | 'menu'
  | 'plus'
  | 'minus';

export function UIIcon({
  name,
  size = 20,
  color = '#14532D',
  style,
}: IconProps & { name: IconType }) {
  const half = size / 2;
  const strokeWidth = Math.max(1.5, Math.round(size / 10));

  switch (name) {
    case 'chevron-down':
      return (
        <View
          style={[
            {
              width: size * 0.5,
              height: size * 0.5,
              borderColor: color,
              borderBottomWidth: strokeWidth,
              borderRightWidth: strokeWidth,
              transform: [{ rotate: '45deg' }, { translateY: -size * 0.1 }],
            },
            style,
          ]}
        />
      );

    case 'chevron-up':
      return (
        <View
          style={[
            {
              width: size * 0.5,
              height: size * 0.5,
              borderColor: color,
              borderTopWidth: strokeWidth,
              borderLeftWidth: strokeWidth,
              transform: [{ rotate: '45deg' }, { translateY: size * 0.1 }],
            },
            style,
          ]}
        />
      );

    case 'chevron-right':
      return (
        <View
          style={[
            {
              width: size * 0.5,
              height: size * 0.5,
              borderColor: color,
              borderTopWidth: strokeWidth,
              borderRightWidth: strokeWidth,
              transform: [{ rotate: '45deg' }, { translateX: -size * 0.1 }],
            },
            style,
          ]}
        />
      );

    case 'chevron-left':
      return (
        <View
          style={[
            {
              width: size * 0.5,
              height: size * 0.5,
              borderColor: color,
              borderBottomWidth: strokeWidth,
              borderLeftWidth: strokeWidth,
              transform: [{ rotate: '45deg' }, { translateX: size * 0.1 }],
            },
            style,
          ]}
        />
      );

    case 'check':
      return (
        <View
          style={[
            {
              width: size * 0.45,
              height: size * 0.7,
              borderColor: color,
              borderBottomWidth: strokeWidth * 1.2,
              borderRightWidth: strokeWidth * 1.2,
              transform: [{ rotate: '45deg' }, { translateY: -size * 0.1 }],
            },
            style,
          ]}
        />
      );

    case 'close':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              position: 'absolute',
              width: size * 0.75,
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
              transform: [{ rotate: '45deg' }],
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: size * 0.75,
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
              transform: [{ rotate: '-45deg' }],
            }}
          />
        </View>
      );

    case 'search':
      return (
        <View style={[{ width: size, height: size }, style]}>
          <View
            style={{
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.3,
              borderWidth: strokeWidth,
              borderColor: color,
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: size * 0.08,
              bottom: size * 0.08,
              width: size * 0.35,
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
              transform: [{ rotate: '45deg' }],
            }}
          />
        </View>
      );

    case 'plus':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              position: 'absolute',
              width: size * 0.7,
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: size * 0.7,
              width: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
            }}
          />
        </View>
      );

    case 'minus':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              width: size * 0.7,
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
            }}
          />
        </View>
      );

    case 'eye':
      return (
        <View
          style={[
            {
              width: size,
              height: size * 0.6,
              borderRadius: size * 0.3,
              borderWidth: strokeWidth,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
              backgroundColor: color,
            }}
          />
        </View>
      );

    case 'eye-off':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              width: size * 0.9,
              height: size * 0.55,
              borderRadius: size * 0.3,
              borderWidth: strokeWidth,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: size * 0.25,
                height: size * 0.25,
                borderRadius: size * 0.15,
                backgroundColor: color,
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              width: size * 0.9,
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
              transform: [{ rotate: '-45deg' }],
            }}
          />
        </View>
      );

    case 'star':
    case 'star-filled': {
      const isFilled = name === 'star-filled';
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: isFilled ? color : 'transparent',
              borderColor: color,
              borderWidth: isFilled ? 0 : strokeWidth,
              borderRadius: 2,
              transform: [{ rotate: '45deg' }],
            }}
          />
        </View>
      );
    }

    case 'info':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              borderRadius: half,
              borderWidth: strokeWidth,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              width: strokeWidth * 1.2,
              height: strokeWidth * 1.2,
              borderRadius: strokeWidth * 0.6,
              backgroundColor: color,
              marginBottom: 2,
            }}
          />
          <View
            style={{
              width: strokeWidth,
              height: size * 0.32,
              backgroundColor: color,
              borderRadius: strokeWidth * 0.5,
            }}
          />
        </View>
      );

    case 'alert':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              borderRadius: 4,
              borderWidth: strokeWidth,
              borderColor: color,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}
        >
          <View
            style={{
              width: strokeWidth,
              height: size * 0.35,
              backgroundColor: color,
              borderRadius: strokeWidth * 0.5,
              marginBottom: 2,
            }}
          />
          <View
            style={{
              width: strokeWidth * 1.2,
              height: strokeWidth * 1.2,
              borderRadius: strokeWidth * 0.6,
              backgroundColor: color,
            }}
          />
        </View>
      );

    case 'calendar':
      return (
        <View
          style={[
            {
              width: size,
              height: size * 0.9,
              borderRadius: 4,
              borderWidth: strokeWidth,
              borderColor: color,
              overflow: 'hidden',
            },
            style,
          ]}
        >
          <View style={{ height: size * 0.28, backgroundColor: color }} />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{
                width: size * 0.3,
                height: strokeWidth,
                backgroundColor: color,
                borderRadius: strokeWidth,
              }}
            />
          </View>
        </View>
      );

    case 'menu':
      return (
        <View
          style={[
            {
              width: size,
              height: size,
              justifyContent: 'space-between',
              paddingVertical: size * 0.2,
            },
            style,
          ]}
        >
          <View
            style={{
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
            }}
          />
          <View
            style={{
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
            }}
          />
          <View
            style={{
              height: strokeWidth,
              backgroundColor: color,
              borderRadius: strokeWidth,
            }}
          />
        </View>
      );

    default:
      return null;
  }
}
