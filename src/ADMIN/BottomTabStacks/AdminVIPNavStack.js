import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomePage from '../Screens/AdminScreen/AdminHomePage';
import EditTip from '../Screens/AdminScreen/EditTip';
import NewTips from '../Screens/AdminScreen/NewTips';

const Stack = createNativeStackNavigator();

export default function AdminVIPNavStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'AdminHomePage'} component={AdminHomePage} />
      <Stack.Screen name={'EditTip'} component={EditTip} />
      <Stack.Screen name={'NewTips'} component={NewTips} />
    </Stack.Navigator>
  );
}
