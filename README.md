# react-native-universal-ui

[![npm version](https://img.shields.io/npm/v/react-native-universal-ui.svg)](https://www.npmjs.com/package/react-native-universal-ui)
[![license](https://img.shields.io/npm/l/react-native-universal-ui.svg)](https://github.com/Sujin-KS/react-native-universal-ui/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-green.svg)](https://reactnative.dev/)

A modern, production-ready, universal React Native UI component library featuring a centralized **emerald greenish design system**, accessible contrast, light & dark themes, zero-config fallbacks, and 45+ customizable components built for iOS, Android, and Web.

---

## 🌟 Key Features

- 🌿 **Modern Greenish Palette**: Thoughtfully designed emerald, mint, and forest green tokens with high-contrast accessibility.
- 🌓 **Light & Dark Theme Engine**: Instant theme switching (`light`, `dark`, or `system`) with automatic system color scheme detection.
- 🛡️ **Zero-Config Fallback**: All components work out of the box using default emerald tokens even without `<UIProvider>`.
- 🧬 **Deep Theme Overrides**: Custom nested theme values merge predictably without overwriting missing defaults.
- 📱 **100% Universal**: Pure React Native foundations that work across Expo, Bare React Native CLI, iOS, Android, and Web without native linking or peer-dependency conflicts.
- 📐 **Self-Contained Icons**: Built-in geometric vector icons (`UIIcon`) with support for custom `ReactNode` icons anywhere.
- 🦾 **TypeScript-First**: Strongly typed component props, theme tokens, and hooks.

---

## 📦 Installation

```bash
# Using npm
npm install react-native-universal-ui

# Using yarn
yarn add react-native-universal-ui
```

---

## 🚀 Quick Start

### 1. Zero-Config (No Provider Required)
You can directly import and use any component immediately!

```tsx
import { View } from 'react-native';
import { AppButton, AppText, AppCard } from 'react-native-universal-ui';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <AppCard variant="elevated">
        <AppText variant="h3" weight="bold">
          Welcome to Universal UI
        </AppText>
        <AppText variant="body2" muted style={{ marginVertical: 8 }}>
          Building beautiful apps with zero configuration.
        </AppText>
        <AppButton title="Get Started" onPress={() => console.log('Pressed')} />
      </AppCard>
    </View>
  );
}
```

---

### 2. Global Theme & Custom Overrides

Wrap your root component with `<UIProvider>` to customize design tokens or listen to theme changes.

```tsx
import React from 'react';
import {
  UIProvider,
  useTheme,
  AppButton,
  AppText,
  ToastProvider,
} from 'react-native-universal-ui';

function MainScreen() {
  const { colors, isDark, toggleThemeMode } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <AppText variant="h2" weight="bold">
        Universal Design System
      </AppText>

      <AppButton
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        variant="secondary"
        onPress={toggleThemeMode}
        style={{ marginTop: 16 }}
      />
    </View>
  );
}

export default function App() {
  return (
    <UIProvider
      mode="system"
      theme={{
        colors: {
          primary: '#166534',
          accent: '#10B981',
        },
      }}
    >
      <ToastProvider>
        <MainScreen />
      </ToastProvider>
    </UIProvider>
  );
}
```

---

## 📚 Component Catalog

### A. Core UI Components
| Component | Description |
| :--- | :--- |
| `AppText` | Typography variants (`h1`-`h6`, `body1`, `body2`, `caption`, `overline`), alignments, weights, and colors. |
| `AppHeading` | Semantic heading with level (1–6), title, subtitle, and layout styles. |
| `AppButton` | Variants (`primary`, `secondary`, `outline`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`), icons, and loading states. |
| `AppIconButton` | Icon action button with accessible labels, badges, and circular/square shapes. |
| `AppCard` | Card container with variants (`elevated`, `outlined`, `filled`), header/footer slots, and press actions. |
| `AppDivider` | Horizontal/vertical separators with optional center labels (e.g. "OR"). |
| `AppSpacer` | Token-based vertical or horizontal spacing component. |
| `AppSurface` | Reusable background and surface container with elevation presets. |

### B. Form Components
| Component | Description |
| :--- | :--- |
| `AppFormField` | Form field wrapper managing labels, asterisks, error messages, and helper text. |
| `AppInput` | Text input with `outlined`, `filled`, and `underlined` variants, clear buttons, and icons. |
| `AppTextArea` | Multiline text area with row limits, auto-height, and live character counters. |
| `AppCheckbox` | Checkbox with custom colors, labels, and animated checkmarks. |
| `AppRadio` / `AppRadioGroup` | Radio buttons and group manager for single-option selection. |
| `AppSwitch` | Smooth toggle switch with sliding animation and accessibility support. |
| `AppSelect` | Modal dropdown picker with optional searchable filter and custom options. |
| `AppSearchInput` | Search bar with magnifying glass icon, debounce callback, and clear button. |
| `AppOtpInput` | Multi-digit pin/OTP input with automatic focus forwarding and paste handling. |
| `AppSlider` | Cross-platform PanResponder slider with value bubbles and custom track colors. |
| `AppDatePicker` | Universal calendar grid modal date picker. |
| `AppPasswordInput` | Secure password field with show/hide eye toggle button. |

### C. Feedback & Loading Components
| Component | Description |
| :--- | :--- |
| `AppLoader` | Activity indicator with brand colors, labels, and fullscreen overlay backdrop. |
| `AppProgressBar` | Linear progress bar with percentage labels and indeterminate mode. |
| `AppSkeleton` | Shimmer pulse placeholder for loading content (rectangles and circles). |
| `AppToast` / `useToast` | Non-blocking notification toasts with top/bottom slides, timers, and status variants. |
| `AppAlert` | Inline status banner (`success`, `error`, `warning`, `info`) with dismiss button. |
| `AppDialog` | Center modal confirmation dialog with action buttons. |
| `AppEmptyState` | Empty placeholder view with icon, title, description, and action button. |
| `AppErrorState` | Error state placeholder with retry action trigger. |
| `AppSnackbar` | Bottom floating notification bar with "Undo" or custom action. |
| `AppBackdrop` | Dimmed modal overlay with press-to-dismiss behavior. |

### D. Data Display Components
| Component | Description |
| :--- | :--- |
| `AppAvatar` | Avatar image with fallback initials and online/offline status dot. |
| `AppBadge` | Numeric count badge (`99+`) or indicator dot with anchoring. |
| `AppChip` / `AppTag` | Interactive or compact badge tags with delete actions and leading icons. |
| `AppListItem` | List row with left/right accessories, subtitles, and chevron chevrons. |
| `AppStatCard` | Analytics stat card with value, title, and percentage trend indicators (+14%). |
| `AppAccordion` | Expandable collapsible section with smooth height transition. |
| `AppTooltip` | Popover tooltip bubble on press or long-press. |
| `AppRating` | Star rating component with interactive tap selection or read-only display. |
| `AppImage` | Progressive image loader with skeleton placeholder and error fallback. |
| `AppImageGallery` | Fullscreen modal image carousel viewer with navigation arrows. |

### E. Navigation & Selection Components
| Component | Description |
| :--- | :--- |
| `AppTabs` | Fixed or scrollable tab navigation with active underline indicator. |
| `AppSegmentedControl` | iOS/Material pill segmented toggle selector. |
| `AppPagination` | Dot indicator or page numbers for carousels and lists. |
| `AppBottomSheet` | Modal bottom sheet with drag handle and smooth slide animation. |
| `AppDrawer` | Slide-in navigation drawer from left or right screen edge. |
| `AppStepper` | Step progress indicator (completed, active, upcoming steps). |
| `AppBreadcrumbs` | Hierarchy path trail with customizable separators. |
| `AppMenu` | Popover action menu anchored to any trigger button. |

### F. Advanced Utilities
| Component | Description |
| :--- | :--- |
| `AppModal` | Standardized modal wrapper with backdrop and header bar. |
| `UIIcon` | Zero-dependency geometric vector icon renderer (chevrons, checks, eye, alert, etc.). |
| `deepMerge` | Utility to deep merge theme configuration objects safely. |

---

## 🎨 Design Tokens

### Emerald Palette Defaults
- **Primary**: `#166534` (Light) / `#22C55E` (Dark)
- **Secondary**: `#15803D` (Light) / `#4ADE80` (Dark)
- **Accent**: `#10B981` (Light) / `#34D399` (Dark)
- **Background**: `#F0FDF4` (Light) / `#052E16` (Dark)
- **Surface**: `#FFFFFF` (Light) / `#0B3D20` (Dark)
- **Text**: `#14532D` (Light) / `#ECFDF5` (Dark)

---

## 🚢 Publishing to npm

To publish this package to the npm registry:

### 1. Build the library
Ensure your distribution bundles (`lib/module` and `lib/typescript`) are compiled:
```bash
yarn prepare
```

### 2. Verify Tests and Types
```bash
yarn typecheck
yarn test
```

### 3. Log in to npm
If not already logged in:
```bash
npm login
```

### 4. Publish Package
```bash
npm publish --access public
```

*Or use the built-in automated release script:*
```bash
yarn release
```

---

## 📄 License

MIT © [Sujin-KS](https://github.com/Sujin-KS)
