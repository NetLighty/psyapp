import React, { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import APP_COLORS from '../../assets/colors';

interface ContentBoxProps {
  children: ReactNode;
  thoughts: boolean;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children, thoughts }) => {
  return (
    <View style={styles.outerContainer}>
      {thoughts ? (
        <View style={[styles.container, styles.thoughtsContainer]}>
          {React.Children.map(children, (child, index) =>
            typeof child === 'string' ? (
              <Text key={index} style={styles.debugText}>{child}</Text>
            ) : (
              child
            )
          )}
        </View>
      ) : (
        <View style={styles.container}>
          {React.Children.map(children, (child, index) =>
            typeof child === 'string' ? (
              <Text key={index} style={styles.debugText}>{child}</Text>
            ) : (
              child
            )
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1, // Растягиваем внешний контейнер на всю доступную высоту
  },
  container: {
    backgroundColor: APP_COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 20,
    minHeight: 390, // Минимальная высота сохранена
    borderRadius: 20,
    flex: 1, // Внутренний контейнер тоже растягивается
  },
  thoughtsContainer: {
    paddingVertical: 20,
    paddingRight: 10,
  },
  debugText: {
    color: 'red', // Для отладки
  },
});

export default ContentBox;