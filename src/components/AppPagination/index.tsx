import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppPaginationProps {
  totalPages: number;
  currentPage: number; // 1-indexed
  onPageChange: (page: number) => void;
  variant?: 'dots' | 'numbers';
  style?: ViewStyle;
}

export function AppPagination({
  totalPages,
  currentPage,
  onPageChange,
  variant = 'dots',
  style,
}: AppPaginationProps) {
  const { colors, spacing, borderRadius } = useTheme();

  if (totalPages <= 1) return null;

  if (variant === 'dots') {
    return (
      <View style={[styles.dotsContainer, { columnGap: spacing.xs }, style]}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <Pressable
              key={page}
              onPress={() => onPageChange(page)}
              style={[
                styles.dot,
                {
                  width: isActive ? 20 : 8,
                  height: 8,
                  borderRadius: borderRadius.full,
                  backgroundColor: isActive ? colors.primary : colors.border,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.numbersContainer, { columnGap: spacing.xs }, style]}>
      <Pressable
        disabled={currentPage <= 1}
        onPress={() => onPageChange(currentPage - 1)}
        style={[
          styles.arrowButton,
          {
            borderRadius: borderRadius.sm,
            borderColor: colors.border,
            opacity: currentPage <= 1 ? 0.4 : 1,
          },
        ]}
      >
        <UIIcon name="chevron-left" size={14} color={colors.text} />
      </Pressable>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <Pressable
            key={page}
            onPress={() => onPageChange(page)}
            style={[
              styles.numberBox,
              {
                borderRadius: borderRadius.sm,
                backgroundColor: isActive ? colors.primary : 'transparent',
                borderColor: isActive ? colors.primary : colors.border,
              },
            ]}
          >
            <AppText
              variant="caption"
              weight={isActive ? 'bold' : 'regular'}
              color={isActive ? colors.white : colors.text}
            >
              {page}
            </AppText>
          </Pressable>
        );
      })}

      <Pressable
        disabled={currentPage >= totalPages}
        onPress={() => onPageChange(currentPage + 1)}
        style={[
          styles.arrowButton,
          {
            borderRadius: borderRadius.sm,
            borderColor: colors.border,
            opacity: currentPage >= totalPages ? 0.4 : 1,
          },
        ]}
      >
        <UIIcon name="chevron-right" size={14} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    transition: 'all 0.2s',
  } as ViewStyle,
  numbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBox: {
    width: 32,
    height: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
