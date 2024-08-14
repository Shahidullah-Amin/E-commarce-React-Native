// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardNavigator from './navigators/DashboardNavigator';
import SignInScreen from './screens/authentication/SignInScreen';
import SignUpScreen from './screens/authentication/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Dashboard' component={DashboardNavigator} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name='SignIn' component={SignInScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{ animation: 'slide_from_right' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
