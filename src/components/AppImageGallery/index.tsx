import { useState } from 'react';
import {
  Modal,
  View,
  Image,
  Pressable,
  StyleSheet,
  type ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppText } from '../AppText';
import { UIIcon } from '../../utils/icons';

export interface AppImageGalleryProps {
  images: ImageSourcePropType[];
  initialIndex?: number;
  visible: boolean;
  onClose: () => void;
}

export function AppImageGallery({
  images,
  initialIndex = 0,
  visible,
  onClose,
}: AppImageGalleryProps) {
  const { colors, spacing } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!visible || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        {/* Top bar with count & close */}
        <View style={[styles.topBar, { padding: spacing.md }]}>
          <AppText variant="body2" weight="bold" color={colors.white}>
            {currentIndex + 1} / {images.length}
          </AppText>

          <Pressable onPress={onClose} hitSlop={12}>
            <UIIcon name="close" size={20} color={colors.white} />
          </Pressable>
        </View>

        {/* Center image container */}
        <View style={styles.imageContainer}>
          {currentImage && (
            <Image
              source={currentImage}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Prev / Next controls */}
        {currentIndex > 0 && (
          <Pressable
            onPress={handlePrev}
            style={[styles.arrowButton, styles.arrowLeft]}
            hitSlop={10}
          >
            <UIIcon name="chevron-left" size={24} color={colors.white} />
          </Pressable>
        )}

        {currentIndex < images.length - 1 && (
          <Pressable
            onPress={handleNext}
            style={[styles.arrowButton, styles.arrowRight]}
            hitSlop={10}
          >
            <UIIcon name="chevron-right" size={24} color={colors.white} />
          </Pressable>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  imageContainer: {
    width: '100%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  arrowButton: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  arrowLeft: {
    left: 16,
  },
  arrowRight: {
    right: 16,
  },
});
