import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import DatePicker from '../../src/negative-thoughts/components/datepicker/datePicker';
import InfoIcon from '../../src/assets/icons/info';
import APP_COLORS from '../../src/assets/colors';
import ExerciseName from '../../src/components/exercersiceName';
import DatePickerContainer from '../../src/negative-thoughts/components/datepicker/container';
import { useThoughtsStore } from '../../src/negative-thoughts/store/thoughtsStore';
import { useDateStore } from '../../src/negative-thoughts/store/dateStore';

const AddThought: React.FC = () => {
  const [isRun, setIsRun] = useState(false);
  //const [thoughts, setThoughts] = useState([{ date: new Date() }]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const { addThought, thoughts } = useThoughtsStore();
  const { date } = useDateStore();

  const addThoughtHandler = (date: Date) => {
    addThought(
      'Негативная мысль',
      'Я должна быть способна отпустить эту ситуацию, а вообще тут много текста всякого, ну не прям много но он есть, и его чуть больше чем по умолчанию отображается, вот',
      date
    );
    //setDatePickerVisible(false);
    console.log(date, 'addthofth');
    router.push('/arrow/exercise');
    //setThoughts([...thoughts, { date }]);
  };

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const cancelDatePicker = () => {
    setDatePickerVisible(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Link href="/">
          <AntDesign name="left" size={15} color="white" />
        </Link>
        <View style={styles.exerciseName}>
          <ExerciseName name={'Падающая стрела'} />
        </View>
        <Text style={styles.title}>Негативная мысль</Text>
        <Text style={styles.postTitle}>
          Запиши негативную мысль, чтобы на основе ее выявить иррациональное
          убеждение
        </Text>
      </View>
      <View style={styles.screen}>
        <View style={styles.datePickerContainer}>
          <DatePickerContainer />
        </View>
        <View style={styles.buttonsContainer}>
          <View
            style={[styles.button]}
            onTouchEnd={() => router.push('/arrow/info')}
          >
            <View style={styles.slantRight}></View>
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText]}>Информация</Text>
              <InfoIcon />
            </View>
          </View>
          <View
            style={[styles.button, styles.activeButton]}
            onTouchEnd={() => addThoughtHandler(date)}
          >
            <View style={[styles.slantLeft, styles.slantLeftActive]}></View>
            <View
              style={styles.textContainer} /* onTouchEnd={openDatePicker} */
            >
              <Text style={[styles.buttonText, styles.green]}>
                Добавить мысль
              </Text>
            </View>
          </View>
        </View>
        {/* {isDatePickerVisible ? (
            <DatePickerModal
                onConfirm={addThought} // Передаем функцию для добавления мысли
                onCancel={cancelDatePicker} // Закрываем модалку при отмене
          />
          ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //paddingBottom: 20,
  },
  exerciseName: {
    position: 'absolute',
    top: -5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    top: -50,
    left: -20,
  },
  buttonsContainer: {
    zIndex: 1,
    gap: 20,
    position: 'relative',
    top: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    height: 56,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 0,
  },
  green: {
    color: APP_COLORS.seaWaveTransitional,
  },
  buttonText: {
    color: '#FFF', // Цвет текста
    textAlign: 'center', // Выравнивание текста по центру
    fontFamily: 'Poppins-Bold', // Шрифт Poppins
    fontSize: 14, // Размер шрифта в пикселях
    fontStyle: 'normal', // Обычный стиль шрифта (по умолчанию)
    fontWeight: '600', // Толщина шрифта (полужирный)
    lineHeight: 19.6, // Высота строки в пикселях
  },
  activeButton: {
    zIndex: 2,
    backgroundColor: APP_COLORS.white,
    color: APP_COLORS.seaWaveTransitional,
  },
  button: {
    zIndex: 1,
    backgroundColor: APP_COLORS.seaWavePrimary,
    flex: 1,
    minWidth: 150,
    height: 71,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //paddingVertical: 18,
    //paddingHorizontal: 19,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    flexShrink: 0, // Для предотвращения сжатия
  },
  arrowBack: {
    width: 25,
    height: 25,
  },
  container: {
    display: 'flex',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24, // Размер в точках (pt), а не в пикселях (px)
    fontWeight: '700',
    lineHeight: 33.6, // Проценты не используются, указывается конкретное значение
    color: APP_COLORS.white,
  },
  postTitle: {
    color: APP_COLORS.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
  },
  hint: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: APP_COLORS.mintMedium,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    left: 20,
    top: -16,
  },
  hintText: {
    color: APP_COLORS.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
  },
  info: {
    zIndex: 10,
    marginTop: 26,
    //height: 460,
  },
  datePickerContainer: {
    flex: 1,
    //height: 'auto',
    zIndex: 10,
    backgroundColor: APP_COLORS.white,
    paddingTop: 20,
    //paddingBottom: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  infoContainer: {
    backgroundColor: APP_COLORS.white,
    paddingTop: 35,
    paddingHorizontal: 20,
    height: 360,
  },
  infoTextContainer: {
    display: 'flex',
    gap: 10,
  },
  text: {
    color: APP_COLORS.blackPrimary,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  link: {
    textDecorationLine: 'underline',
  },
  slantLeft: {
    position: 'absolute',
    bottom: 8,
    left: -26,
    width: 0,
    height: 0,
    borderBottomWidth: 60,
    borderBottomColor: 'transparent',
    borderRightWidth: 30,
    borderRightColor: APP_COLORS.seaWavePrimary, // Цвет, который делает срез
  },
  slantRight: {
    position: 'absolute',
    bottom: 8,
    right: -26,
    width: 0,
    height: 0,
    borderBottomWidth: 60,
    borderBottomColor: 'transparent',
    borderLeftWidth: 30,
    borderLeftColor: APP_COLORS.seaWavePrimary, // Цвет, который делает срез
  },
  slantRightActive: {
    borderLeftColor: APP_COLORS.white,
  },
  slantLeftActive: {
    borderRightColor: APP_COLORS.white,
  },
});

export default AddThought;
