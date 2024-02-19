import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { CreateAccount, DetailsPage, VipTips ,Contacts} from '../Screens/StackNav';
import Home from '../Screens/BottomNavigation/Home';
import NavigationString from '../Constants/NavigationString';
import AdminHomePage from '../ADMIN/Screens/AdminScreen/AdminHomePage';
import EditTip from '../ADMIN/Screens/AdminScreen/EditTip';
import NewTips from '../ADMIN/Screens/AdminScreen/NewTips';
import ListUser from '../ADMIN/Screens/AdminScreen/LIstUser';
import EditUser from '../ADMIN/Screens/AdminScreen/EditUser';
import AddUser from '../ADMIN/Screens/AdminScreen/AddUser';
import AdminProfile from '../ADMIN/Screens/AdminScreen/AdminProfile';


const Stack = createNativeStackNavigator();

export default function HomeNavStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={NavigationString.HOME} component={Home} />
      <Stack.Screen name={NavigationString.CREATE_ACCOUNT} component={CreateAccount} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
      <Stack.Screen name={NavigationString.DETAILS_PAGE} component={DetailsPage} />
      <Stack.Screen name={'adminhomepage'} component={AdminHomePage} />
      <Stack.Screen name={'EditTip'} component={EditTip} />
      <Stack.Screen name={'NewTips'} component={NewTips} />
      <Stack.Screen name={'ListUser'} component={ListUser} />
      <Stack.Screen name={'EditUser'} component={EditUser} />
      <Stack.Screen name={'AddUser'} component={AddUser} />
      <Stack.Screen name={'AdminProfile'} component={AdminProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
