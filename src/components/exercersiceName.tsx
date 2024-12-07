import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import APP_COLORS from '../assets/colors';

interface ExerciseNameProps {
  name: string;
}

const ExerciseName: React.FC<ExerciseNameProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Эквивалент display: flex (React Native использует flex по умолчанию)
    paddingVertical: 4, // Эквивалент padding сверху и снизу (4px)
    paddingHorizontal: 16, // Эквивалент padding слева и справа (16px)
    justifyContent: 'center', // Центрирование содержимого по горизонтали
    alignItems: 'center', // Центрирование по вертикали
    gap: 10, // Промежуток между элементами (добавлено в React Native 0.71)
    borderRadius: 20, // Радиус закругления углов
    backgroundColor: APP_COLORS.seaWavePrimary, // Прозрачный белый фон
  },
  text: {
    color: APP_COLORS.white,
  }
});

export default ExerciseName;
