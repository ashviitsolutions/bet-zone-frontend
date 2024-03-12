import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Screens/BottomNavigation/Profile';
import { Contacts, CreateAccount, DetailsPage, Login, Plans, VipTips } from '../Screens/StackNav';
import NavigationString from '../Constants/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import Colors from '../Constants/Colors';

const Stack = createNativeStackNavigator();

export default function ProfileNavStack() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.error('Error getting token:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (loading) {
    // Display loader while token is being retrieved
    return <Loader customebgColor={Colors.mainColor} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name={NavigationString.PROFILE} component={Profile} />
      ) : null}
      <Stack.Screen name={NavigationString.CREATE_ACCOUNT} component={CreateAccount} />
      <Stack.Screen name={NavigationString.LOGIN} component={Login} />
      <Stack.Screen name={NavigationString.PLAN} component={Plans} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
      <Stack.Screen name={NavigationString.DETAILS_PAGE} component={DetailsPage} />
    </Stack.Navigator>
  );
}
