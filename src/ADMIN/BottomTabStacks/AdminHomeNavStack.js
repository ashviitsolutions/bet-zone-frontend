import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ListUser from '../Screens/AdminScreen/LIstUser';
import AddUser from '../Screens/AdminScreen/AddUser';
import EditUser from '../Screens/AdminScreen/EditUser';



const Stack = createNativeStackNavigator();

export default function AdminHomeNavStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={'List'} component={ListUser} />
      <Stack.Screen name={'AddUser'} component={AddUser} />
      <Stack.Screen name={'EditUser'} component={EditUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
