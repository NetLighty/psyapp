import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import APP_COLORS from '../../../assets/colors';
import { formatDate } from '../../../assets/utils/formatDate';
import DatePicker from './datePicker';
import TimePicker from './timePicker';

const { width } = Dimensions.get('window');

const DatePickerContainer = () => {
  const [activeTab, setActiveTab] = useState<'date' | 'time'>('date');
  const [translateX] = useState(new Animated.Value(0));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSwitch = (tab: 'date' | 'time') => {
    setActiveTab(tab);
    Animated.timing(translateX, {
      toValue: tab === 'date' ? 0 : width / 2.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -10 && activeTab === 'date') {
      handleSwitch('time');
    } else if (translationX > 10 && activeTab === 'time') {
      handleSwitch('date');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(selectedDate)}</Text>

      <View style={{ flex: 1 }}>
        {activeTab === 'date' ? <DatePicker /> : <TimePicker />}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.grayLine} />
        <View style={styles.indicatorWrapper}>
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
        <View style={styles.iconContainer}>
          <AntDesign
            name="calendar"
            size={24}
            color={activeTab === 'date' ? APP_COLORS.seaWavePrimary : '#ccc'}
            onPress={() => handleSwitch('date')}
          />
        </View>
        <View style={styles.iconContainer}>
          <AntDesign
            name="clockcircleo"
            size={24}
            color={activeTab === 'time' ? APP_COLORS.seaWavePrimary : '#ccc'}
            onPress={() => handleSwitch('time')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
  },
  date: {
    textAlign: 'center',
    color: APP_COLORS.blackPrimary,
    textTransform: 'capitalize',
    lineHeight: 14 * 1.4,
    marginBottom: 0,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
    flex: 1, // Распределяем оставшееся пространство
    gap: 8, // Зазор между кнопками
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  indicatorWrapper: {
    position: 'absolute',
    top: -8,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'transparent',
  },
  indicator: {
    width: '50%',
    height: 2,
    backgroundColor: APP_COLORS.seaWavePrimary,
  },
  grayLine: {
    position: 'absolute',
    top: -8,
    width: '100%',
    height: 2,
    backgroundColor: APP_COLORS.grayDark,
  },
});

export default DatePickerContainer;
