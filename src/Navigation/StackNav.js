import React, { } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Tabs from './TabsNav';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import NavigationString from '../Constants/NavigationString';
import AdminTabs from './AdminTabsNav';
import { Login } from '../Screens/StackNav';
const Stack = createNativeStackNavigator();
export default function StackNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationString.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={NavigationString.TABS} component={Tabs} />
      <Stack.Screen name={NavigationString.Admin_Tabs} component={AdminTabs} />
      <Stack.Screen name={"LOGIN"} component={Login} />
    </Stack.Navigator>
  );
}
