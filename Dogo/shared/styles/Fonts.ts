import {PixelRatio} from 'react-native';

/**
 * I assume the design provided is for iPhone 11 (=== 3)
 * https://reactnative.dev/docs/pixelratio
 * PixelRatio.get() === 1
    mdpi Android devices

    PixelRatio.get() === 1.5
    hdpi Android devices

    PixelRatio.get() === 2
    iPhone SE, 6S, 7, 8
    iPhone XR
    iPhone 11
    xhdpi Android devices

    PixelRatio.get() === 3
    iPhone 6S Plus, 7 Plus, 8 Plus
    iPhone X, XS, XS Max
    iPhone 11 Pro, 11 Pro Max
    Pixel, Pixel 2
    xxhdpi Android devices

    PixelRatio.get() === 3.5
    Nexus 6
    Pixel XL, Pixel 2 XL
    xxxhdpi Android devices
 * @param value number
 * @returns number
 */
export const getDensityRelativeValue = (value: number): number => {
  const pixelRatio = PixelRatio.get();

  switch (true) {
    case pixelRatio === 3:
      return value;

    case pixelRatio === 2:
      return value - 3;

    case pixelRatio >= 2.5 && pixelRatio < 3:
      return value - 2.5;

    default:
      return value;
  }
};

const Fonts = {
  Standard: getDensityRelativeValue(24),
  Medium: getDensityRelativeValue(18),
  Small: getDensityRelativeValue(12),
};

export default Fonts;
