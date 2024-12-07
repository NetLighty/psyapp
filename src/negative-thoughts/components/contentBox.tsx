import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import APP_COLORS from '../../assets/colors';

interface ContentBoxProps {
  children: ReactNode;
  thoughts: boolean;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children, thoughts }) => {
  return (
    <View>
      {thoughts ? (
        <View>
          <View
            style={[
              styles.container,
              thoughts ? styles.thoughtsContainer : null,
            ]}
          >
            <ScrollView style={styles.scrollContainer}>{children}</ScrollView>
          </View>
        </View>
      ) : (
        <View
          style={[styles.container, thoughts ? styles.thoughtsContainer : null]}
        >
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 20,
    minHeight: 380,
    borderRadius: 20,
  },
  thoughtsContainer: {
    paddingVertical: 20,
    paddingRight: 10,
    overflow: 'scroll',
  },
  scrollContainer: {
    //flex: 1,
    paddingRight: 10,
  },
});

export default ContentBox;
