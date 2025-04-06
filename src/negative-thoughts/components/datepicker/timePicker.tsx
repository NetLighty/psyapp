import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import APP_COLORS from '../../../assets/colors';
import { useDateStore } from '../../store/dateStore';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 32;
const VISIBLE_ITEMS = 7;
const BUFFER_SIZE = 50; // Уменьшим буфер для меньшей нагрузки

const TimePicker = () => {
  const [period, setPeriod] = useState('AM');
  const { date, setHours, setMinutes } = useDateStore();
  
  const hourRef = useRef<FlatList>(null);
  const minuteRef = useRef<FlatList>(null);
  
  const is24Hour = true;
  const baseHours = useMemo(() => 
    is24Hour
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i)),
    []
  );
  const baseMinutes = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => i),
    []
  );

  const hours = useMemo(() => 
    Array(BUFFER_SIZE).fill(baseHours).flat(),
    [baseHours]
  );
  const minutes = useMemo(() => 
    Array(BUFFER_SIZE).fill(baseMinutes).flat(),
    [baseMinutes]
  );

  const scrollToInitial = useCallback(() => {
    const hourIndex = date.getHours() + (baseHours.length * Math.floor(BUFFER_SIZE / 2));
    const minuteIndex = date.getMinutes() + (baseMinutes.length * Math.floor(BUFFER_SIZE / 2));
    
    hourRef.current?.scrollToOffset({
      offset: hourIndex * ITEM_HEIGHT,
      animated: false,
    });
    minuteRef.current?.scrollToOffset({
      offset: minuteIndex * ITEM_HEIGHT,
      animated: false,
    });
  }, [date, baseHours.length, baseMinutes.length]);

  const onScroll = useCallback((type: 'hour' | 'minute') => {
    let lastValue = -1;
    return (event: any) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const baseLength = type === 'hour' ? baseHours.length : baseMinutes.length;
      const value = (index % baseLength + baseLength) % baseLength;

      // Обновляем только при изменении значения
      if (value !== lastValue) {
        lastValue = value;
        if (type === 'hour') {
          setHours(value);
        } else {
          setMinutes(value);
        }
      }

      // Простая проверка границ буфера
      const totalItems = type === 'hour' ? hours.length : minutes.length;
      const bufferCenter = baseLength * Math.floor(BUFFER_SIZE / 2);
      if (index < baseLength || index > totalItems - baseLength) {
        const newIndex = value + bufferCenter;
        (type === 'hour' ? hourRef : minuteRef).current?.scrollToOffset({
          offset: newIndex * ITEM_HEIGHT,
          animated: false,
        });
      }
    };
  }, [setHours, setMinutes, hours.length, minutes.length, baseHours.length, baseMinutes.length]);

  const renderItem = useCallback(({ item }: { item: number }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{String(item).padStart(2, '0')}</Text>
    </View>
  ), []);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const displayTime = useMemo(() => ({
    hours: String(date.getHours()).padStart(2, '0'),
    minutes: String(date.getMinutes()).padStart(2, '0'),
  }), [date]);

  return (
    <View style={styles.container} onLayout={scrollToInitial}>
      <Text style={styles.label}>Введите время</Text>
      <View style={styles.timeContainer}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{displayTime.hours}</Text>
          <Text style={styles.timeLabel}>Часы</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{displayTime.minutes}</Text>
          <Text style={styles.timeLabel}>Минуты</Text>
        </View>
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
        <View style={styles.selectionBox} />
        <View style={styles.pickerContainer}>
          <FlatList
            ref={hourRef}
            data={hours}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate={0.9}
            onScroll={onScroll('hour')}
            scrollEventThrottle={16}
            initialNumToRender={VISIBLE_ITEMS}
            maxToRenderPerBatch={VISIBLE_ITEMS*10}
            windowSize={5}
            getItemLayout={getItemLayout}
          />
          <FlatList
            ref={minuteRef}
            data={minutes}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate={0.9}
            onScroll={onScroll('minute')}
            scrollEventThrottle={16}
            initialNumToRender={VISIBLE_ITEMS}
            maxToRenderPerBatch={VISIBLE_ITEMS*7}
            windowSize={5}
            getItemLayout={getItemLayout}
          />
        </View>
        <View style={styles.periodPicker}>
          <View style={styles.item}>
            <Text style={styles.itemText}>{period}</Text>
          </View>
          <View onTouchEnd={() => setPeriod(period === 'AM' ? 'PM' : 'AM')} style={styles.item}>
            <Text style={styles.itemText}>{period === 'AM' ? 'PM' : 'AM'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  selectionBox: {
    position: 'absolute',
    top: -2,
    width: '100%',
    height: 32,
    padding: 10,
    borderWidth: 1.2,
    borderRadius: 10,
    borderColor: APP_COLORS.seaWaveTransitional,
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
    
   
marginBottom: 15,
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
  periodPicker: {
    width: 60,
    height: '100%',
  },
  selectedText: {
    color: APP_COLORS.mintLight,
  },
  scrollsContainer: {
    marginTop: 20,
    flexDirection: 'row',
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
});

export default TimePicker;