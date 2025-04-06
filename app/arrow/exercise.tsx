import React, { useRef, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import ContentBox from '../../src/negative-thoughts/components/contentBox';
import DatePicker from '../../src/negative-thoughts/components/datepicker/datePicker';
import ExerciseName from '../../src/components/exercersiceName';
import ThoughtGPT from '../../src/negative-thoughts/components/thoughtGPT';
import APP_COLORS from '../../src/assets/colors';
import { useThoughtsStore } from '../../src/negative-thoughts/store/thoughtsStore';
import InfoIcon from '../../src/assets/icons/info';

interface ThoughtItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  isPushed: boolean;
  createdAt: Date;
}

const Exercise: React.FC = () => {
  const [isRun, setIsRun] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const { thoughts, deleteThought, addThought } = useThoughtsStore();

  const addThoughtHandler = () => {
    addThought(
      'Негативная мысль',
      'Я должна быть способна отпустить эту ситуацию, а вообще тут много текста всякого, ну не прям много но он есть, и его чуть больше чем по умолчанию отображается, вот',
      new Date()
    );
    console.log('thought added!');
  };

  const openDatePicker = () => {
    setDatePickerVisible(true);
  };

  const cancelDatePicker = () => {
    setDatePickerVisible(false);
  };

  const renderThought = ({ item }: { item: ThoughtItem }) => (
    <ThoughtGPT
      id={item.id}
      title={item.title}
      description={item.description}
      date={item.date}
      isPushed={item.isPushed}
    />
  );

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
      <View style={styles.thoughts}>
        <ContentBox thoughts={true}>
          <FlatList
            data={thoughts}
            renderItem={renderThought}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.infoTextContainer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={7}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </ContentBox>
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
          /* onTouchEnd={() => addThoughtHandler()} */
          onTouchEnd={() => router.push('/arrow/addThought')}
        >
          <View style={[styles.slantLeft, styles.slantLeftActive]}></View>
          <View style={styles.textContainer} /* onTouchEnd={openDatePicker} */ >
            <Text style={[styles.buttonText, styles.green]}>
              Добавить мысль
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 0,
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
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.6,
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
    justifyContent: 'flex-end',
    flexShrink: 0,
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
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 33.6,
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
  },
  thoughts: {
    zIndex: 10,
    flex: 1,
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
    paddingBottom: 20,
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
    borderRightColor: APP_COLORS.seaWavePrimary,
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
    borderLeftColor: APP_COLORS.seaWavePrimary,
  },
  slantRightActive: {
    borderLeftColor: APP_COLORS.white,
  },
  slantLeftActive: {
    borderRightColor: APP_COLORS.white,
  },
});

export default Exercise;