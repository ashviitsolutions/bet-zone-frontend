import React, { } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Tabs from './TabsNav';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import NavigationString from '../Constants/NavigationString';
import AdminTabs from './AdminTabsNav';
import { CreateAccount, Login } from '../Screens/StackNav';
import SuccessPage from '../Screens/StackNav/SuccessPage';
const Stack = createNativeStackNavigator();
export default function StackNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationString.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={NavigationString.TABS} component={Tabs} />
      <Stack.Screen name={NavigationString.Admin_Tabs} component={AdminTabs} />
      <Stack.Screen name={"LOGIN"} component={Login} />
      {/* <Stack.Screen name={NavigationString.CREATE_ACCOUNT} component={CreateAccount} /> */}
      <Stack.Screen name={NavigationString.SUCCESS_PAGE} component={SuccessPage} />
    </Stack.Navigator>
  );
}
