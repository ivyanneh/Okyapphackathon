import React, { useState } from 'react';
import { StyleSheet, View, Alert, TextInput, Button, Modal, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Helper function to determine the phase based on cycle days
const getExerciseSuggestion = (selectedDate, cycleStartDate) => {
  const MS_IN_DAY = 86400000; // milliseconds in a day
  const cycleLength = 28; // average cycle length (adjust as needed)
  
  const cycleStart = new Date(cycleStartDate);
  const selected = new Date(selectedDate);
  
  const daysDifference = Math.floor((selected - cycleStart) / MS_IN_DAY) % cycleLength;
  
  if (daysDifference <= 5) {
    return 'Light exercises like walking or yoga for relaxation (Menstruation phase).';
  } else if (daysDifference <= 14) {
    return 'High-intensity exercises or strength training (Follicular phase).';
  } else if (daysDifference <= 21) {
    return 'Moderate exercises like cardio or pilates (Ovulation phase).';
  } else {
    return 'Restorative exercises or stretching (Luteal phase).';
  }
};

const CalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fitnessActivity, setFitnessActivity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [cycleStartDate, setCycleStartDate] = useState('2024-11-01'); // Example cycle start date
  const [savedActivities, setSavedActivities] = useState({}); // State to store saved activities

  const handleFitnessCheck = () => {
    if (!selectedDate) {
      Alert.alert('No date selected', 'Please select a date first.');
      return;
    }

    const exerciseSuggestion = getExerciseSuggestion(selectedDate, cycleStartDate);
    setFitnessActivity(exerciseSuggestion);
    setModalVisible(true);
  };

  const handleSaveActivity = () => {
    // Save the fitness activity for the selected date
    setSavedActivities(prevState => ({
      ...prevState,
      [selectedDate]: fitnessActivity,
    }));

    Alert.alert('Activity saved', `Fitness activity for ${selectedDate}: ${fitnessActivity}`);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          "2024-10-24": { marked: true, dotColor: 'red' },
        }}
      />

      <View style={styles.buttonContainer}>
        <Button title="Log Fitness Activity" onPress={handleFitnessCheck} color="#C4DFE6" />
      </View>

      {/* Modal to input fitness activity */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Suggested Exercise for {selectedDate}</Text>
            <Text style={styles.suggestedExercise}>{fitnessActivity}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your custom activity"
              value={fitnessActivity}
              onChangeText={setFitnessActivity}
            />
            <View style={styles.modalButtons}>
              <Button title="Save Suggested Exercise" onPress={handleSaveActivity} color="#28a745" />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#dc3545" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Display saved activities */}
      <View style={styles.savedActivitiesContainer}>
        <Text style={styles.savedActivitiesTitle}>Saved Activities</Text>
        {Object.keys(savedActivities).map(date => (
          <Text key={date} style={styles.savedActivityText}>
            {date}: {savedActivities[date]}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#66A5AD',
  },
  calendar: {
    width: '100%',
    height: 450,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#66A5AD',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  suggestedExercise: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  savedActivitiesContainer: {
    marginTop: 20,
    width: '80%',
  },
  savedActivitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  savedActivityText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default CalendarScreen;
