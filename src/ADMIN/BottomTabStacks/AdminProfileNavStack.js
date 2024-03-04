import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AdminProfile from '../Screens/AdminScreen/AdminProfile';

const Stack = createNativeStackNavigator();

export default function AdminProfileNavStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'AdminProfile'} component={AdminProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
