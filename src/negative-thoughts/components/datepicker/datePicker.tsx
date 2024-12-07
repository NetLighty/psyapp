import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  subDays,
  getDay,
} from 'date-fns';
import { AntDesign } from '@expo/vector-icons';
import { ru } from 'date-fns/locale';
import APP_COLORS from '../../../assets/colors';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const startOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => i + 1
  );

  const prevMonth = subMonths(selectedDate, 1);
  const endOfPrevMonth = new Date(
    prevMonth.getFullYear(),
    prevMonth.getMonth() + 1,
    0
  ).getDate();

  const prevMonthPadding = (getDay(startOfMonth) + 6) % 7; // Определяем сколько дней предыдущего месяца отображать

  // Добавляем последние дни предыдущего месяца
  const prevMonthDays = Array.from(
    { length: prevMonthPadding },
    (_, i) => endOfPrevMonth - prevMonthPadding + i + 1
  );

  const totalDays = [...prevMonthDays, ...daysInMonth];
  const extraDays = totalDays.length % 7 !== 0 ? 7 - (totalDays.length % 7) : 0;

  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const handleSelectDay = (day: number | null, isCurrentMonth: boolean) => {
    if (day !== null && isCurrentMonth) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      setSelectedDate(newDate);
    }
  };

  const handleYesterday = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const handleDayBeforeYesterday = () => {
    setSelectedDate(subDays(selectedDate, 2));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        {/* Month and Year Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {format(selectedDate, 'LLLL yyyy', { locale: ru })}
          </Text>
          <View style={styles.arrowContainer}>
            <TouchableWithoutFeedback onPress={handlePrevMonth}>
              <View style={styles.arrowTouchArea}>
                <AntDesign
                  name="left"
                  size={15}
                  color={APP_COLORS.seaWavePrimary}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleNextMonth}>
              <View style={styles.arrowTouchArea}>
                <AntDesign
                  name="right"
                  size={15}
                  color={APP_COLORS.seaWavePrimary}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* Days of the week */}
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day) => (
            <View key={day} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Date grid */}
        <View style={styles.dateGrid}>
          {totalDays.map((day, index) => {
            const isPrevMonthDay = index < prevMonthPadding;
            const isNextMonthDay = day > endOfMonth.getDate();
            const isCurrentMonth = !isPrevMonthDay && !isNextMonthDay;

            const currentDate = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              isCurrentMonth ? day : 1
            );
            const isSelected =
              isCurrentMonth && isSameDay(currentDate, selectedDate);

            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleSelectDay(day, isCurrentMonth)}
              >
                <View
                  style={[
                    styles.day,
                    isPrevMonthDay || isNextMonthDay
                      ? styles.inactiveDay
                      : isSelected
                      ? styles.selectedDay
                      : styles.unselectedDay,
                  ]}
                >
                  <Text
                    style={
                      isSelected
                        ? styles.selectedDayText
                        : isPrevMonthDay || isNextMonthDay
                        ? styles.inactiveDayText
                        : styles.unselectedDayText
                    }
                  >
                    {day}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
          {/* Extra days to fill the row */}
          {Array.from({ length: extraDays }).map((_, index) => (
            <View key={`extra-${index}`} style={styles.inactiveDay}>
              <Text style={styles.inactiveDayText}>{index + 1}</Text>
            </View>
          ))}
        </View>

        {/* Yesterday and Day Before Yesterday Buttons */}
        <View style={styles.footer}>
          <TouchableWithoutFeedback onPress={handleYesterday}>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Вчера</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleDayBeforeYesterday}>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Позавчера</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxWidth: 270,
  },
  screen: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowTouchArea: {
    paddingHorizontal: 10, // Увеличиваем область нажатия на стрелки
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  dayHeader: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_COLORS.green2Percent,
  },
  dayHeaderText: {
    fontSize: 12,
    color: APP_COLORS.grayDark,
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 0,
    minHeight: 240, // Резервируем место для дополнительной строки
  },
  day: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 5,
  },
  inactiveDay: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: APP_COLORS.green2Percent,
  },
  unselectedDay: {
    backgroundColor: APP_COLORS.green5Percent,
  },
  selectedDay: {
    backgroundColor: '#249EA0',
  },
  selectedDayText: {
    color: APP_COLORS.white,
  },
  unselectedDayText: {
    color: '#5C5C5C',
  },
  inactiveDayText: {
    color: APP_COLORS.grayDark,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginTop: 0,
  },
  footerButton: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: APP_COLORS.seaWaveTransitional,
  },
  footerButtonText: {
    color: APP_COLORS.seaWaveTransitional,
    fontSize: 14,
  },
});

export default DatePicker;
