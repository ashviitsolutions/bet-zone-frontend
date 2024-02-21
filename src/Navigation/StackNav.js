import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './TabsNav';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import NavigationString from '../Constants/NavigationString';
import { AuthLogin, Contacts, CreateAccount, Login} from '../Screens/StackNav';
import AuthSignup from '../Screens/Auth/AuthSignup';
const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={NavigationString.SPLASH_SCREEN} component={SplashScreen}/>
      <Stack.Screen name={NavigationString.TABS} component={Tabs} />
      {/* <Stack.Screen name={NavigationString.ON_BOARDING_PAGE} component={OnBoardPage} /> */}
      <Stack.Screen name={NavigationString.AUTH_LOGIN} component={AuthLogin} />
      <Stack.Screen name={NavigationString.AUTH_SIGN_UP} component={AuthSignup} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
