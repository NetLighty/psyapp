import { StyleSheet, View, Text } from 'react-native';
import APP_COLORS from '../src/assets/colors';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/arrow/info">
        <Text style={styles.text}>Упражнение 1</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  /* container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: APP_COLORS.seaWaveTransitional,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  }, */
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: APP_COLORS.white,
    fontSize: 24,
  },
});
