import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import APP_COLORS from '../../assets/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { hexToRgb } from '../../assets/utils/func';
import Svg, { Path } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import { formatDate } from '../../assets/utils/formatDate';

interface ThoughtProps {
  title: string;
  description: string;
  date: Date;
}

const MAX_LENGTH = 45;

const Thought: React.FC<ThoughtProps> = ({ title, description, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Если текст длинный, отрезаем его до максимальной длины
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

  return (
    <Animatable.View
      animation="fadeIn" // Указываем тип анимации
      duration={500} // Длительность анимации
    >
      <View style={styles.container}>
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
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    gap: 5,
    // Цвет границы
    //justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: APP_COLORS.seaWavePrimary,
    padding: 20,
    paddingRight: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

export default Thought;
