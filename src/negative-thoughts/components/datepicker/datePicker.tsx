import React from 'react';
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
import { useDateStore } from '../../store/dateStore';

const DatePicker = () => {
  const { date: selectedDate, setDate } = useDateStore();
  const today = new Date();

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

  const prevMonthPadding = (getDay(startOfMonth) + 6) % 7;

  const prevMonthDays = Array.from(
    { length: prevMonthPadding },
    (_, i) => endOfPrevMonth - prevMonthPadding + i + 1
  );

  const totalDays = [...prevMonthDays, ...daysInMonth];
  const extraDays = totalDays.length % 7 !== 0 ? 7 - (totalDays.length % 7) : 0;

  const handlePrevMonth = () => {
    const newDate = subMonths(selectedDate, 1);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(selectedDate, 1);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setDate(newDate);
  };

  const handleSelectDay = (day: number | null, isCurrentMonth: boolean) => {
    if (day !== null && isCurrentMonth) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      setDate(newDate);
    }
  };

  const handleYesterday = () => {
    const newDate = subDays(today, 1);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setDate(newDate);
  };

  const handleDayBeforeYesterday = () => {
    const newDate = subDays(today, 2);
    newDate.setHours(selectedDate.getHours());
    newDate.setMinutes(selectedDate.getMinutes());
    setDate(newDate);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
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

        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day) => (
            <View key={day} style={styles.dayHeader}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ))}
        </View>

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
            const isToday =
              isCurrentMonth && isSameDay(currentDate, today) && !isSelected;

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
                      : isToday
                      ? styles.todayDay
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
          {Array.from({ length: extraDays }).map((_, index) => (
            <View key={`extra-${index}`} style={styles.inactiveDay}>
              <Text style={styles.inactiveDayText}>{index + 1}</Text>
            </View>
          ))}
        </View>

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
    color: APP_COLORS.blackPrimary,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowTouchArea: {
    paddingHorizontal: 10,
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
    minHeight: 240,
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
  todayDay: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#249EA0',
    backgroundColor: '#D7DBDC',
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