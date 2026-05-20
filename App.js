import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AuthScreen from './Screens/AuthScreen';
import HomeScreen from './Screens/HomeScreen';
import NotesScreen from './Screens/NotesScreen';
import ExploreScreen from './Screens/ExploreScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (token, email, uid) => {
    // ✅ FIX: Pehle validate karein ke sab values hain
    if (!token || !email || !uid) {
      console.error('handleLoginSuccess: missing values!', { token, email, uid });
      return;
    }
    console.log('Login success! Setting state...');
    // ✅ FIX: Ek saath set karein
    setUserToken(token);
    setUserEmail(email);
    setUserId(uid);
  };

  const handleLogout = () => {
    setUserToken(null);
    setUserEmail(null);
    setUserId(null);
  };

  // ✅ FIX: Sirf userToken check kaafi hai (string truthy check)
  if (!userToken) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#1E3A8A',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Notes') iconName = focused ? 'document-text' : 'document-text-outline';
            else if (route.name === 'Explore') iconName = focused ? 'compass' : 'compass-outline';
            else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen userEmail={userEmail} onLogout={handleLogout} />}
        </Tab.Screen>
        <Tab.Screen name="Notes">
          {() => <NotesScreen token={userToken} userId={userId} />}
        </Tab.Screen>
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}