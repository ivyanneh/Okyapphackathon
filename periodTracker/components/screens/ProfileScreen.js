import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Importing Calendar from react-native-calendars

// Helper function to validate date format (YYYY-MM-DD)
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) != null;
};

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [periodLength, setPeriodLength] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleSave = () => {
    // Validate inputs before saving
    if (!name || !cycleLength || !periodLength || !lastPeriodDate) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (isNaN(cycleLength) || isNaN(periodLength)) {
      Alert.alert("Error", "Cycle length and period length must be numbers.");
      return;
    }

    if (!isValidDate(lastPeriodDate)) {
      Alert.alert("Error", "Last period date must be in the format YYYY-MM-DD.");
      return;
    }

    // Save the data (Here you can integrate saving to a database or local storage)
    console.log("Saved profile data:", { name, cycleLength, periodLength, lastPeriodDate });
    Alert.alert("Success", "Profile saved successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.header}>Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Cycle Length (days)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter cycle length"
          keyboardType="numeric"
          value={cycleLength}
          onChangeText={setCycleLength}
        />
        <Text style={styles.label}>Period Length (days)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter period length"
          keyboardType="numeric"
          value={periodLength}
          onChangeText={setPeriodLength}
        />
        
        {/* Calendar for Last Period Start Date */}
        <Text style={styles.label}>Last Period Start Date</Text>
        <TouchableOpacity onPress={() => setCalendarVisible(!calendarVisible)}>
          <TextInput
            style={styles.input}
            placeholder="Select date"
            editable={false}
            value={lastPeriodDate}
          />
        </TouchableOpacity>

        {calendarVisible && (
          <Calendar
            markedDates={{
              [lastPeriodDate]: { selected: true, selectedColor: '#66A5AD' }
            }}
            onDayPress={(day) => {
              setLastPeriodDate(day.dateString);
              setCalendarVisible(false); // Close calendar after selection
            }}
            monthFormat={'yyyy MM'}
            style={styles.calendar}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#C4DFE6',
  },
  profileSection: {
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#66A5AD',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
  },
  calendar: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default ProfilePage;
