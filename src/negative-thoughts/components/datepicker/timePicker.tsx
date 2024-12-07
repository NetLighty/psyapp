import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import APP_COLORS from '../../../assets/colors';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 32; // Высота элемента (определяется стилями)

const periods = ['AM', 'PM'];

const TimePicker = () => {
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(25);
  const [period, setPeriod] = useState('AM');
  const is24Hour = true; // Флаг для формата 24-часового времени

  const hours = is24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  /* const handleScroll = (list, value, setValue) => {
    const newValue = Math.round(value.nativeEvent.contentOffset.y / 40);
    setValue(list[newValue % list.length]);
  }; */

  const loopData = (data: string[], count: number) => {
    const repeated = [];
    for (let i = 0; i < count; i++) {
      repeated.push(...data);
    }
    return repeated;
  };

  const onScroll = (type: 'hour' | 'minute' | 'meridiem') => (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (type === 'hour') {
      setHour(hours[index]);
    } else if (type === 'minute') {
      setMinute(minutes[index]);
    } else if (type === 'meridiem') {
      setPeriod(periods[index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Введите время</Text>
      <View style={styles.timeContainer}>
        {/* Отображение часов */}
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>
            {hour.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.timeLabel}>Часы</Text>
        </View>

        {/* Двоеточие между часами и минутами */}
        <Text style={styles.colon}>:</Text>

        {/* Отображение минут */}
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>
            {minute.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.timeLabel}>Минуты</Text>
        </View>

        {/* Кнопки AM/PM */}
        <View style={styles.periodContainer}>
          <TouchableOpacity
            onPress={() => setPeriod('AM')}
            style={[
              styles.periodTopButton,
              period === 'AM' && styles.selectedPeriod,
            ]}
          >
            <Text
              style={[
                styles.periodText,
                period === 'AM' && styles.selectedText,
              ]}
            >
              AM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPeriod('PM')}
            style={[
              styles.periodBottomButton,
              period === 'PM' && styles.selectedPeriod,
            ]}
          >
            <Text
              style={[
                styles.periodText,
                period === 'PM' && styles.selectedText,
              ]}
            >
              PM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scrollsContainer}>
        <View style={styles.pickerContainer}>
          {/* Часы */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            onScroll={onScroll('hour')}
            scrollEventThrottle={16}
          >
            {hours.map((hour) => (
              <View key={hour} style={styles.item}>
                <Text style={styles.itemText}>{hour}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Минуты */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            onScroll={onScroll('minute')}
            scrollEventThrottle={16}
          >
            {minutes.map((minute) => (
              <View key={minute} style={styles.item}>
                <Text style={styles.itemText}>{minute}</Text>
              </View>
            ))}
          </ScrollView>

          <ScrollView
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          onScroll={onScroll('meridiem')}
          scrollEventThrottle={16}
        >
          {periods.map((period) => (
            <View key={period} style={styles.item}>
              <Text style={styles.itemText}>{period}</Text>
            </View>
          ))}
        </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
    color: APP_COLORS.gray80Percent,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    width: 91,
    height: 56,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.mintLight,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  timeText: {
    fontSize: 32,
    lineHeight: 42,
    color: APP_COLORS.seaWavePrimary,
    fontFamily: 'Poppins-Bold',
  },
  timeLabel: {
    position: 'absolute',
    bottom: -18,
    left: 0,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: APP_COLORS.grayDark,
    marginTop: 5,
  },
  colon: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: APP_COLORS.seaWavePrimary,
    marginHorizontal: 5,
  },
  periodContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  periodTopButton: {
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 28,
    backgroundColor: APP_COLORS.mintLight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  periodBottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 28,
    backgroundColor: APP_COLORS.mintLight,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  selectedPeriod: {
    backgroundColor: APP_COLORS.seaWavePrimary,
  },
  periodText: {
    fontSize: 16,
    color: APP_COLORS.seaWavePrimary,
    fontFamily: 'Poppins-Medium',
  },
  selectedText: {
    color: APP_COLORS.mintLight,
  },
  scrollsContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: ITEM_HEIGHT * 8,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: APP_COLORS.gray,
  },
  selectedItemContainer: {
    position: 'absolute',
    top: height / 2 - ITEM_HEIGHT / 2,
    width: '80%',
    height: ITEM_HEIGHT,
    borderColor: APP_COLORS.seaWavePrimary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: APP_COLORS.seaWavePrimary,
  },
});
export default TimePicker;
