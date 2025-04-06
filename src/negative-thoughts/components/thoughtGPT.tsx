import React, { useState, useEffect, useRef, memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PanResponder, Animated } from 'react-native';
import APP_COLORS from '../../assets/colors';
import { hexToRgb } from '../../assets/utils/func';
import Svg, { Path } from 'react-native-svg';
import { formatDate } from '../../assets/utils/formatDate';
import { AntDesign, Feather } from '@expo/vector-icons';
import DeletionNotification from './deletionNotification';
import { useThoughtsStore } from '../store/thoughtsStore';

interface ThoughtProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  isPushed: boolean;
}

const MAX_LENGTH = 45;

const ThoughtGPT: React.FC<ThoughtProps> = ({ id, title, description, date, isPushed }) => {
  const BUTTON_WIDTH = 76;
  const BUTTON_GAP = 10;
  const SWIPE_THRESHOLD = -BUTTON_WIDTH * 2 - BUTTON_GAP * 2;
  const VERTICAL_THRESHOLD = 10;
  const MIN_DX_CHANGE = 2;

  const [isExpanded, setIsExpanded] = useState(false);
  const [translateX] = useState(new Animated.Value(isPushed ? SWIPE_THRESHOLD : 0));
  const [isDeleted, setIsDeleted] = useState(false);
  const { setPushedThought, pushedThoughtId } = useThoughtsStore();
  const isSwiping = useRef(false);
  const lastDx = useRef(0);

  const handleDelete = () => setIsDeleted(true);
  const handleRestore = () => setIsDeleted(false);

  // Синхронизация с isPushed из стора
  useEffect(() => {
    if (!isSwiping.current) {
      Animated.timing(translateX, {
        toValue: isPushed ? SWIPE_THRESHOLD : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isPushed, translateX]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && 
             Math.abs(gestureState.dx) > VERTICAL_THRESHOLD;
    },
    onPanResponderGrant: () => {
      isSwiping.current = true;
      lastDx.current = isPushed ? SWIPE_THRESHOLD : 0; // Устанавливаем начальное значение
      // Не сбрасываем сразу pushedThoughtId, чтобы избежать подлага
    },
    onPanResponderMove: (_, gestureState) => {
      const newX = Math.max(SWIPE_THRESHOLD, Math.min(0, gestureState.dx + (isPushed ? SWIPE_THRESHOLD : 0)));
      if (Math.abs(newX - lastDx.current) > MIN_DX_CHANGE) {
        translateX.setValue(newX);
        lastDx.current = newX;
        // Если начинаем свайпать новый компонент, сбрасываем предыдущий асинхронно
        if (pushedThoughtId && pushedThoughtId !== id && gestureState.dx !== 0) {
          setTimeout(() => setPushedThought(null), 0); // Асинхронный сброс
        }
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      isSwiping.current = false;
      if (Math.abs(gestureState.dy) > VERTICAL_THRESHOLD && 
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx)) {
        Animated.timing(translateX, {
          toValue: isPushed ? SWIPE_THRESHOLD : 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setPushedThought(isPushed ? id : null));
      } else if (gestureState.dx < SWIPE_THRESHOLD / 2 - (isPushed ? SWIPE_THRESHOLD : 0)) {
        Animated.timing(translateX, {
          toValue: SWIPE_THRESHOLD,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setPushedThought(id));
      } else {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setPushedThought(null));
      }
    },
    onPanResponderTerminate: () => {
      isSwiping.current = false;
      Animated.timing(translateX, {
        toValue: isPushed ? SWIPE_THRESHOLD : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setPushedThought(isPushed ? id : null));
    },
  });

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const shortDescription =
    description.length > MAX_LENGTH
      ? description.slice(0, MAX_LENGTH) + '...'
      : description;

  const Arrow = (props: any) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={9}
      fill="none"
      {...props}
    >
      <Path
        fill="#249EA0"
        d="M15.354 4.854a.5.5 0 0 0 0-.708L12.172.964a.5.5 0 1 0-.708.708L14.293 4.5l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 5h15V4H0v1Z"
      />
    </Svg>
  );

  if (isDeleted) return <DeletionNotification thoughtId={id} onRestore={handleRestore} />;

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.textRow}>
            <Text style={styles.description}>
              {isExpanded ? description : shortDescription}
            </Text>
            {description.length > MAX_LENGTH && (
              <TouchableOpacity onPress={toggleExpanded}>
                <Text style={styles.moreText}>
                  {isExpanded ? 'Свернуть' : 'Ещё'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
        <View style={styles.arrow}>
          <Arrow />
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.buttonsContainer, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity style={[styles.button, styles.greenButton]}>
          <AntDesign name="calendar" size={30} color={APP_COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.orangeButton]}>
          <Feather name="trash-2" size={30} color={APP_COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 5,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: APP_COLORS.seaWavePrimary,
    padding: 20,
    paddingRight: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  title: {
    color: `rgba(${hexToRgb(APP_COLORS.gray)}, 0.80)`,
    fontWeight: '600',
  },
  description: {
    color: `rgba(${hexToRgb(APP_COLORS.gray)}, 0.80)`,
    lineHeight: 14 * 1.4,
  },
  date: {
    color: APP_COLORS.grayDark,
    lineHeight: 14 * 1.4,
  },
  arrow: {
    position: 'absolute',
    right: 20,
  },
  moreText: {
    color: APP_COLORS.grayDark,
    lineHeight: 18,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    flexWrap: 'wrap',
  },
  buttonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: -171,
    gap: 10,
    height: '100%',
  },
  button: {
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: '100%',
  },
  greenButton: {
    backgroundColor: APP_COLORS.mint,
  },
  orangeButton: {
    backgroundColor: APP_COLORS.yellow,
  },
});

export default memo(ThoughtGPT);