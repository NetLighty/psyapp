import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import APP_COLORS from '../src/assets/colors';
import { Link } from 'expo-router';

interface HomeProps {
  children: ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Link href="/arrow/info">
        <Text style={styles.text}>Упражнение 1</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: APP_COLORS.white,
    fontSize: 24,
  },
});

export default Home;
