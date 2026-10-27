import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface StepItem {
  title: string;
  description?: string;
}

export interface AppStepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  style?: ViewStyle;
}

export function AppStepper({ steps, currentStep, style }: AppStepperProps) {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        const circleBg =
          isCompleted || isActive ? colors.primary : colors.disabledBackground;
        const circleBorder =
          isCompleted || isActive ? colors.primary : colors.border;
        const textColor =
          isCompleted || isActive ? colors.white : colors.disabled;

        return (
          <View key={step.title} style={styles.stepWrapper}>
            <View style={styles.indicatorRow}>
              {/* Connector line before (except first) */}
              {index > 0 && (
                <View
                  style={[
                    styles.connector,
                    {
                      backgroundColor:
                        index <= currentStep ? colors.primary : colors.border,
                    },
                  ]}
                />
              )}

              {/* Step Circle */}
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: circleBg,
                    borderColor: circleBorder,
                    borderRadius: borderRadius.full,
                  },
                ]}
              >
                {isCompleted ? (
                  <UIIcon name="check" size={14} color={colors.white} />
                ) : (
                  <AppText
                    variant="caption"
                    weight="bold"
                    style={{ color: textColor }}
                  >
                    {index + 1}
                  </AppText>
                )}
              </View>

              {/* Connector line after (except last) */}
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.connector,
                    {
                      backgroundColor:
                        index < currentStep ? colors.primary : colors.border,
                    },
                  ]}
                />
              )}
            </View>

            <AppText
              variant="caption"
              weight={isActive ? 'bold' : 'medium'}
              color={isActive ? colors.primary : colors.textSecondary}
              align="center"
              style={{ marginTop: spacing.xs, maxWidth: 80 }}
            >
              {step.title}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  circle: {
    width: 28,
    height: 28,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  connector: {
    flex: 1,
    height: 2,
  },
});
