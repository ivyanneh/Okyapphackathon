import { StyleSheet, Text, View, Alert, ImageBackground, Dimensions, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { en } from '../resources/en';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const navigation = useNavigation();

  // Handle Log out with confirmation
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => Alert.alert("You have logged out successfully"),
        },
      ]
    );
  };

  // Handle Delete Account with confirmation
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => Alert.alert("Account deleted"),
        },
      ]
    );
  };

  const handleContactUs = () => {
    Alert.alert('Contact Us', 'For support, please reach out to: lvctdev@lvcthealth.org');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background/desert-default.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Notification Switch */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationEnabled}
          />
        </View>

        {/* Dark Mode Switch */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>

        {/* About Section */}
        <View style={styles.settingsWrapper}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('AboutScreen')}
          >
            <View style={styles.aboutContainer}>
              <Text style={styles.settingText}>{en.about}</Text>
              <Text style={styles.settingAbout}>{en.about_info}</Text>
            </View>
          </TouchableOpacity>

          {/* Terms & Conditions Section */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('TermsConditionsScreen')}
          >
            <View style={styles.aboutContainer}>
              <Text style={styles.settingText}>{en.t_and_c}</Text>
              <Text style={styles.settingAbout}>{en.t_and_c_info}</Text>
            </View>
          </TouchableOpacity>

          {/* Privacy Policy Section */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <View style={styles.aboutContainer}>
              <Text style={styles.settingText}>{en.privacy_policy}</Text>
              <Text style={styles.settingAbout}>{en.privacy_info}</Text>
            </View>
          </TouchableOpacity>

          {/* Access Settings Section */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('AccessSettings')}
          >
            <View style={styles.aboutContainer}>
              <Text style={styles.settingText}>{en.access_setting}</Text>
              <Text style={styles.settingAbout}>{en.settings_info}</Text>
            </View>
          </TouchableOpacity>

          {/* Future Prediction Section */}
          <View style={styles.settingItem}>
            <View style={styles.aboutContainer}>
              <Text style={styles.settingText}>{en.future_prediciton}</Text>
              <Text style={styles.settingAbout}>{en.future_prediciton_info}</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
          </View>
        </View>

        {/* Buttons Container (Horizontal Layout) */}
        <View style={styles.buttonContainer}>
          {/* Log Out Button */}
          <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>

          {/* Delete Account Button */}
          <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Delete account</Text>
          </TouchableOpacity>

          {/* Contact Us Button */}
          <TouchableOpacity style={styles.contactUsButton} onPress={handleContactUs}>
            <Text style={styles.buttonText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#C4DFE6',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingText: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingAbout: {
    marginLeft: 20,
    fontSize: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 30,
  },
  logOutButton: {
    width: '30%', 
    height: 50, 
    marginHorizontal: 5,
    backgroundColor: '#66A5AD',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  deleteAccountButton: {
    width: '30%', // Adjust width to be proportional to screen size
    height: 50, // Set fixed height
    marginHorizontal: 5,
    backgroundColor: '#66A5AD',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B7B6B6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contactUsButton: {
    width: '30%', // Adjust width to be proportional to screen size
    height: 50, // Set fixed height
    marginHorizontal: 5,
    backgroundColor: '#66A5AD',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  aboutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsWrapper: {
    marginBottom: 20,
  },
});
