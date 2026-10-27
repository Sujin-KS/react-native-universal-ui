import { useState, useMemo } from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppFormField } from '../AppFormField';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppDatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function AppDatePicker({
  label,
  placeholder = 'Select date...',
  value,
  onChange,
  minDate,
  maxDate,
  error,
  helperText,
  required,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  testID,
}: AppDatePickerProps) {
  const { colors, spacing, borderRadius, shadows } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const initialDate = value || new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).getDay();
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(viewYear, viewMonth, day);
    onChange(selected);
    setModalVisible(false);
  };

  const isSelectedDate = (day: number) => {
    if (!value) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === viewMonth &&
      value.getFullYear() === viewYear
    );
  };

  const isDateDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (
      minDate &&
      d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    ) {
      return true;
    }
    if (
      maxDate &&
      d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
    ) {
      return true;
    }
    return false;
  };

  const formattedDisplay = value
    ? `${MONTH_NAMES[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`
    : placeholder;

  return (
    <AppFormField
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      disabled={disabled}
      style={containerStyle}
      labelStyle={labelStyle}
    >
      <Pressable
        testID={testID}
        disabled={disabled}
        accessibilityRole="button"
        onPress={() => setModalVisible(true)}
        style={[
          styles.trigger,
          {
            backgroundColor: disabled
              ? colors.disabledBackground
              : colors.surface,
            borderColor: error ? colors.error : colors.border,
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.sm * 1.5,
            paddingVertical: spacing.sm,
          },
          inputStyle,
        ]}
      >
        <AppText
          variant="body1"
          color={value ? colors.text : colors.placeholder}
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {formattedDisplay}
        </AppText>
        <UIIcon name="calendar" size={18} color={colors.textSecondary} />
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={[
              styles.calendarCard,
              {
                backgroundColor: colors.surface,
                borderRadius: borderRadius.lg,
                padding: spacing.md,
              },
              shadows.lg,
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header with Month / Year and navigation */}
            <View style={styles.calendarHeader}>
              <Pressable
                onPress={handlePrevMonth}
                hitSlop={8}
                style={styles.navButton}
              >
                <UIIcon name="chevron-left" size={16} color={colors.text} />
              </Pressable>

              <AppText variant="h6" weight="bold" color={colors.primaryDark}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </AppText>

              <Pressable
                onPress={handleNextMonth}
                hitSlop={8}
                style={styles.navButton}
              >
                <UIIcon name="chevron-right" size={16} color={colors.text} />
              </Pressable>
            </View>

            {/* Days of week */}
            <View style={[styles.daysRow, { marginVertical: spacing.xs }]}>
              {DAYS.map((d) => (
                <AppText
                  key={d}
                  variant="caption"
                  weight="semiBold"
                  color={colors.textSecondary}
                  style={styles.dayCellText}
                >
                  {d}
                </AppText>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.grid}>
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <View key={`empty-${idx}`} style={styles.cell} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const isSelected = isSelectedDate(day);
                const disabledCell = isDateDisabled(day);

                return (
                  <Pressable
                    key={`day-${day}`}
                    disabled={disabledCell}
                    onPress={() => handleSelectDay(day)}
                    style={[
                      styles.cell,
                      {
                        borderRadius: borderRadius.full,
                        backgroundColor: isSelected
                          ? colors.primary
                          : 'transparent',
                      },
                    ]}
                  >
                    <AppText
                      variant="body2"
                      weight={isSelected ? 'bold' : 'regular'}
                      color={
                        disabledCell
                          ? colors.disabled
                          : isSelected
                            ? colors.white
                            : colors.text
                      }
                    >
                      {day}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </AppFormField>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    minHeight: 46,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  calendarCard: {
    width: '100%',
    maxWidth: 340,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  navButton: {
    padding: 8,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayCellText: {
    width: 36,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
