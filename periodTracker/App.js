import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from './components/screens/ProfileScreen';
import EncyclopediaScreen from './components/screens/EncyclopediaScreen';
import CalendarScreen from './components/screens/CalendarScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import AboutScreen from './components/Settings/AboutScreen';
import AccessSettings from './components/Settings/AccessSettings';
import PrivacyPolicy from './components/Settings/PrivacyPolicy';
import TermsConditions from './components/Settings/TermsConditions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='AboutScreen' component={AboutScreen} />
      <Stack.Screen name='TermsConditions' component={TermsConditions} />
      <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
      <Stack.Screen name='AccessSettings' component={AccessSettings} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = 'account-outline';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar';
            } else if (route.name === 'Encyclopedia') {
              iconName = 'book-outline';
            } else if (route.name === 'Settings') {
              iconName = 'cog-outline';
            }

            
            return (
              <Icon
                name={iconName}
                color={color}
                size={size || 24}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Encyclopedia" component={EncyclopediaScreen} />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



