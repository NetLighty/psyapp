import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import APP_COLORS from '../../assets/colors';
import { useThoughtsStore } from '../store/thoughtsStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import TimerCircle from './timerCircle';

interface DeletionNotificationProps {
  thoughtId: string;
  onRestore: () => void;
}

const DeletionNotification: React.FC<DeletionNotificationProps> = ({
  thoughtId,
  onRestore,
}) => {
  const [timer, setTimer] = useState(5);
  const { deleteThought } = useThoughtsStore();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timer === 1) {
      const interval = setInterval(() => deleteThought(thoughtId), 1000);
      return () => clearInterval(interval);
    }
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.deletionNotification}>
      {/* <Animated.View
        style={[styles.loading, { transform: [{ rotate: spin }] }]}
      >
        <AntDesign
          name="loading1"
          size={24}
          color={APP_COLORS.seaWaveTransitional}
        />
      </Animated.View> */}
      <TimerCircle>
        <Text style={styles.timer}>{timer}</Text>
      </TimerCircle>
      <Text style={styles.deletionText}>Запись удалена</Text>
      <TouchableOpacity onPress={onRestore} style={styles.restoreButton}>
        <Text style={styles.restoreText}>Отменить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  deletionNotification: {
    height: 45,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10, // Скругление углов в пикселях
    borderWidth: 1, // Толщина границы в пикселях
    borderColor: '#249EA0', // Цвет границы (без var, переменные обрабатываются иначе)
    shadowColor: 'rgba(0, 77, 78, 0.3)', // Более насыщенный цвет
    shadowOffset: { width: 4, height: 12 }, // Больше смещение
    shadowOpacity: 1, // Оставляем насыщенность
    shadowRadius: 20, // Уменьшаем размытие, делая тень плотнее
    elevation: 12, // Для Android – делает тень сильнее
  },
  loading: {
    left: 10,
    position: 'absolute',
  },
  timer: {
    position: 'absolute',
    left: 9,
    bottom: 4,
    color: APP_COLORS.seaWaveTransitional,
    fontWeight: 'bold',
  },
  deletionText: {
    position: 'relative',
    left: -18,
    color: APP_COLORS.blackPrimary,
  },
  restoreButton: {
    paddingVertical: 10,
  },
  restoreText: {
    color: APP_COLORS.seaWaveTransitional,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontWeight: 600,
    height: 'auto',
  },
});

export default DeletionNotification;
