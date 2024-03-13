import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Screens/BottomNavigation/Profile';
import { Contacts, DetailsPage, Login, Plans, VipTips } from '../Screens/StackNav';
import NavigationString from '../Constants/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import Colors from '../Constants/Colors';
import Register from '../Screens/StackNav/Register';
import UpdateProfile from '../Screens/StackNav/UpdateProfile';

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
    token ? (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NavigationString.UPDATE_PROFILE} component={UpdateProfile} />
        <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name={NavigationString.PROFILE} component={Profile} />
         <Stack.Screen name={NavigationString.REGISTER} component={Register} />
        <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      </Stack.Navigator>
    )
  );
}
