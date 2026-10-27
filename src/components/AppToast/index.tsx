import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type PropsWithChildren,
} from 'react';
import {
  View,
  Animated,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  actionText?: string;
  onAction?: () => void;
}

interface ToastContextType {
  showToast: (options: ToastOptions | string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: PropsWithChildren) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-20)).current;
  const timerRef = useRef<any>(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToast(null);
    });
  }, [opacityAnim, translateYAnim]);

  const showToast = useCallback(
    (options: ToastOptions | string) => {
      const opts: ToastOptions =
        typeof options === 'string' ? { message: options } : options;

      if (timerRef.current) clearTimeout(timerRef.current);

      setToast(opts);

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const duration = opts.duration ?? 3500;
      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          hideToast();
        }, duration);
      }
    },
    [hideToast, opacityAnim, translateYAnim]
  );

  const getBorderColor = (type?: ToastType) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
      default:
        return colors.info;
    }
  };

  const getIcon = (type?: ToastType) => {
    switch (type) {
      case 'success':
        return <UIIcon name="check" size={16} color={colors.success} />;
      case 'error':
        return <UIIcon name="alert" size={16} color={colors.error} />;
      case 'warning':
        return <UIIcon name="alert" size={16} color={colors.warning} />;
      case 'info':
      default:
        return <UIIcon name="info" size={16} color={colors.info} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.toastContainer,
            {
              opacity: opacityAnim,
              transform: [{ translateY: translateYAnim }],
            },
          ]}
        >
          <View
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
            style={[
              styles.toastBox,
              shadows.lg,
              {
                backgroundColor: colors.surface,
                borderLeftColor: getBorderColor(toast.type),
                borderLeftWidth: 4,
                borderRadius: borderRadius.md,
                padding: spacing.sm * 1.5,
              },
            ]}
          >
            <View style={{ marginRight: spacing.sm, marginTop: 2 }}>
              {getIcon(toast.type)}
            </View>

            <View style={{ flex: 1 }}>
              <AppText variant="body2" weight="semiBold" color={colors.text}>
                {toast.message}
              </AppText>
              {Boolean(toast.description) && (
                <AppText
                  variant="caption"
                  color={colors.textSecondary}
                  style={{ marginTop: 2 }}
                >
                  {toast.description}
                </AppText>
              )}
            </View>

            {Boolean(toast.actionText) && (
              <Pressable
                onPress={() => {
                  toast.onAction?.();
                  hideToast();
                }}
                style={{ marginLeft: spacing.sm }}
              >
                <AppText
                  variant="caption"
                  weight="bold"
                  color={getBorderColor(toast.type)}
                >
                  {toast.actionText}
                </AppText>
              </Pressable>
            )}

            <Pressable
              onPress={hideToast}
              hitSlop={8}
              style={{ marginLeft: spacing.sm }}
            >
              <UIIcon name="close" size={14} color={colors.textSecondary} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export interface AppToastStandaloneProps {
  visible: boolean;
  message: string;
  description?: string;
  type?: ToastType;
  onDismiss?: () => void;
  style?: ViewStyle;
}

export function AppToast({
  visible,
  message,
  description,
  type = 'info',
  onDismiss,
  style,
}: AppToastStandaloneProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();

  if (!visible) return null;

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'info':
      default:
        return colors.info;
    }
  };

  return (
    <View
      style={[
        styles.toastBox,
        shadows.md,
        {
          backgroundColor: colors.surface,
          borderLeftColor: getBorderColor(),
          borderLeftWidth: 4,
          borderRadius: borderRadius.md,
          padding: spacing.sm * 1.5,
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        <AppText variant="body2" weight="semiBold" color={colors.text}>
          {message}
        </AppText>
        {Boolean(description) && (
          <AppText
            variant="caption"
            color={colors.textSecondary}
            style={{ marginTop: 2 }}
          >
            {description}
          </AppText>
        )}
      </View>
      {Boolean(onDismiss) && (
        <Pressable
          onPress={onDismiss}
          hitSlop={8}
          style={{ marginLeft: spacing.sm }}
        >
          <UIIcon name="close" size={14} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 99999,
    alignItems: 'center',
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
  },
});
