import React, { useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import Svg, { G, Path, Defs } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Link } from 'expo-router';
import ExerciseName from '../../src/components/exercersiceName';
import ContentBox from '../../src/negative-thoughts/components/contentBox';
import InfoIcon from '../../src/assets/icons/info';
import APP_COLORS from '../../src/assets/colors';

const NegativeThoughtsInfo: React.FC = () => {
  const [isRun, setIsRun] = useState(false);
  const [thoughts, setThoughts] = useState([{ date: new Date() }]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const addThought = (date: Date) => {
    setDatePickerVisible(false);
    console.log(date, 'addthofth');
    setThoughts([...thoughts, { date }]);
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
        <Text style={styles.title}>Выбери негативную мысль</Text>
        <Text style={styles.postTitle}>
          На основе которой выявишь иррациональное убеждение
        </Text>
      </View>

      <View>
        <View style={styles.info}>
          <ContentBox thoughts={false}>
            <View style={styles.hint}>
              <Text style={styles.hintText}>Информация</Text>
              <InfoIcon />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.text}>
                На этом экране собраны негативные мысли, которые ты записывал в
                ходе выполнения упражнения "
                <Text style={styles.link}>Журнал событий</Text>"
              </Text>
              <Text style={styles.text}>
                Если в списке нет негативной мысли с которой ты бы хотел начать
                работать, добавь негативную мысль самостоятельно нажав кнопку
                "Добавить мысль", либо пройди упражнение "
                <Text style={styles.link}>Журнал событий</Text>"
              </Text>
            </View>
          </ContentBox>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={[styles.button, styles.activeButton]}>
            <View style={[styles.slantRight, styles.slantRightActive]}></View>
            <View style={styles.textContainer}>
              <Text style={[styles.buttonText, styles.green]}>
                тут стрелочки
              </Text>
            </View>
          </View>
          <View style={styles.button} onTouchEnd={() => setIsRun(true)}>
            <View style={[styles.slantLeft]}></View>
            <View style={styles.textContainer}>
              <Link href="/arrow/exercise">
                <Text style={styles.buttonText}>К упражнению</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 30,
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
    height: 390,
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

export default NegativeThoughtsInfo;
