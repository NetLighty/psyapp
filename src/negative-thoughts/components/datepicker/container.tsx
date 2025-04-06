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
import { useDateStore } from '../../store/dateStore';
import Entypo from '@expo/vector-icons/Entypo';

const { width } = Dimensions.get('window');

const DatePickerContainer = () => {
  const [activeTab, setActiveTab] = useState<'date' | 'time'>('date');
  const [translateX] = useState(new Animated.Value(0));
  const { date } = useDateStore();

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
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formatDate(date)}</Text>
        <Entypo
          style={styles.dateArrow}
          name="chevron-small-up"
          size={18}
          color={APP_COLORS.gray80Percent}
        />
      </View>

      <View style={styles.pickerContent}>
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
    //minHeight: 480,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateArrow: {
    position: 'absolute',
    right: 27,
  },
  date: {
    textAlign: 'center',
    color: APP_COLORS.blackPrimary,
    textTransform: 'capitalize',
    lineHeight: 14 * 1.4,
    marginBottom: 0,
    fontSize: 14,
  },
  pickerContent: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 40, // Увеличен отступ сверху для смещения вниз
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
    gap: 8,
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