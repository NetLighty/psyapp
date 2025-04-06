import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, ViewProps } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import APP_COLORS from '../../assets/colors';

// Тип для пропсов компонента
interface TimerCircleProps extends ViewProps {
  children?: React.ReactNode;
}

const TimerCircle: React.FC<TimerCircleProps> = ({ children, ...rest }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000, // 5 секунд
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -69.1], // Обновлено для радиуса 11: 2 * π * 11 ≈ 69.1
  });

  return (
    <View style={{ position: 'relative', width: 26, height: 26 }} {...rest}>
      <Svg width="26" height="26" style={{ position: 'absolute' }}>
        <Circle
          cx="13"
          cy="13"
          r="11"
          stroke="#FFFFFF"
          strokeWidth="1"
          fill="none"
        />
        <AnimatedCircle
          cx="13"
          cy="13"
          r="11"
          stroke={APP_COLORS.seaWaveTransitional}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="69.1"
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin="13, 13"
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default TimerCircle;