import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Profile from '../Screens/BottomNavigation/Profile';
import {
  Contacts,
  CreateAccount,
  DetailsPage,
  Login,
  Plans,
  VipTips,
} from '../Screens/StackNav';
import NavigationString from '../Constants/NavigationString';

const Stack = createNativeStackNavigator();

export default function ProfileNavStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={NavigationString.PROFILE} component={Profile} />
        <Stack.Screen name={NavigationString.LOGIN} component={Login} />
        <Stack.Screen name={NavigationString.PLAN} component={Plans} />
        <Stack.Screen
          name={NavigationString.CREATE_ACCOUNT}
          component={CreateAccount}
        />
        <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
        <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
        <Stack.Screen
          name={NavigationString.DETAILS_PAGE}
          component={DetailsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
