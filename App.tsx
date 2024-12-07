import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Heart from './src/3d/scene';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AmbientLight } from 'three';
import { useFonts } from 'expo-font';
import NegativeThoughts from './src/negative-thoughts';
import APP_COLORS from './src/assets/colors';

export default function App() {
  const [loaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    // Другие ваши шрифты...
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <NegativeThoughts />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: APP_COLORS.seaWaveTransitional,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
