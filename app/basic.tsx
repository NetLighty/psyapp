import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface HomeProps {
  children: ReactNode;
}

const Basic: React.FC<HomeProps> = ({ children }) => {
  return (
    <View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default Basic;