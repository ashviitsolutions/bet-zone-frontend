import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './TabsNav';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import NavigationString from '../Constants/NavigationString';
import { OnBoardPage } from '../Screens/StackNav';
const Stack = createNativeStackNavigator();

export default function AdminStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationString.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={NavigationString.TABS} component={Tabs} />
      <Stack.Screen name={NavigationString.ON_BOARDING_PAGE} component={OnBoardPage} />
    </Stack.Navigator>
  );
}
