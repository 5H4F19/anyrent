import { useMemo } from 'react';
import heart from './heart.ic.json';
import { coloriseLottie } from './colorizeLottie';
import Lottie from 'lottie-react-native';

export function Example() {
  const colorizedSource = useMemo(
    () =>
      coloriseLottie(heart, {
        // surface3273.surface3273
        'layers.0.shapes.0.it.0.it.0.it.2.c.k': '#fde68a',
      }),
    [],
  );

  return (
    <Lottie autoPlay loop source={colorizedSource} style={{ width: 50, height: 50 }} />
  );
}