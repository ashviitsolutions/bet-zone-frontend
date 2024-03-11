import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminProfile from '../Screens/AdminScreen/AdminProfile';
const Stack = createNativeStackNavigator();
export default function AdminProfileNavStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'AdminProfile'} component={AdminProfile} />
    </Stack.Navigator>
  );
}