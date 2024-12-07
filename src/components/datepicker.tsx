import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import APP_COLORS from '../assets/colors';

interface DatePickerModalProps {
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; // For animation

  // Control the fade-in and fade-out animation based on `isVisible`
  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleConfirm = () => {
    onConfirm(date);
    setIsVisible(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    if (event.type === 'dismissed') {
      // If user presses "Cancel", just close the modal
      handleCancel();
    } else if (Platform.OS === 'android') {
      onConfirm(currentDate); // Confirm immediately for Android
    }
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Modal visible={isVisible} transparent animationType="none">
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Выбери дату</Text>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCancel}>
                  <Text style={styles.buttonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                  <Text style={styles.buttonText}>Подтвердить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>
      )}

      {Platform.OS === 'android' && isVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: APP_COLORS.seaWavePrimary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
  },
});

export default DatePickerModal;
