import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AmbientLight } from 'three';
import { useFonts } from 'expo-font';
import NegativeThoughts from '../src/negative-thoughts';
import APP_COLORS from '../src/assets/colors';
import { ScreenContainer } from 'react-native-screens';
import React from 'react';

export default function RootLayout() {
  const [loaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
    // Другие ваши шрифты...
  });

  if (!loaded) {
    return <Text>Загрузка шрифтов...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={APP_COLORS.seaWaveTransitional}
        translucent={false}
      />
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: APP_COLORS.seaWaveTransitional,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});
