import { useState, forwardRef } from 'react';
import { Pressable } from 'react-native';
import { AppInput, type AppInputProps } from '../AppInput';
import { UIIcon } from '../../utils/icons';
import { useTheme } from '../../theme/ThemeProvider';

export interface AppPasswordInputProps extends Omit<
  AppInputProps,
  'secureTextEntry'
> {
  showToggle?: boolean;
}

export const AppPasswordInput = forwardRef<any, AppPasswordInputProps>(
  ({ showToggle = true, rightIcon, ...rest }, ref) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);

    const toggleIcon = showToggle ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
        onPress={() => setVisible((prev) => !prev)}
        hitSlop={8}
      >
        <UIIcon
          name={visible ? 'eye-off' : 'eye'}
          size={18}
          color={colors.textSecondary}
        />
      </Pressable>
    ) : null;

    return (
      <AppInput
        ref={ref}
        secureTextEntry={!visible}
        rightIcon={rightIcon || toggleIcon}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
    );
  }
);

AppPasswordInput.displayName = 'AppPasswordInput';
