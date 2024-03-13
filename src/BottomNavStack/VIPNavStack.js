import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import VIP from '../Screens/BottomNavigation/VIP';
import Register from '../Screens/StackNav/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import Colors from '../Constants/Colors';
import {IP} from '../Constants/Server';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

export default function VIPNavStack() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [membership, setMemberhsip] = useState(true);
  const [membershipLevel, setMembershipLevel] = useState('');
  const [status, setStatus] = useState('');
  const [membershipEndDate, setMembershipEndDate] = useState('');
  useEffect(() => {
    setLoading(true);
    const getUserMembership = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${IP}/user/membership-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('membership', data);

        setMembershipLevel(data.membershipType);
        await AsyncStorage.setItem('membership', data.membershipType);
        setStatus(data.status);
        setMemberhsip(data.status === 'active');

        const daysToAdd = data.renewalDays;
        const result = new Date(data.lastRenewalPaymentDate);
        result.setDate(result.getDate() + daysToAdd);
        setMembershipEndDate(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    setLoading(false);
    getUserMembership();
  }, []); // Run once when component mounts

  console.log('membership status', status);

  async function fetchData() {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      // const meberhsip = await AsyncStorage.getItem('is_member');
      setToken(storedToken);
      // setMemberhsip(meberhsip === 'true');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function Loadercomp() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.mainColor,
        }}>
        <ActivityIndicator size="large" color={Colors.yellowColor} />
      </View>
    );
  }

  return loading ? (
    <Loadercomp />
  ) : status && token ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      <Stack.Screen
        name={NavigationString.DETAILS_PAGE}
        component={DetailsPage}
      />
    </Stack.Navigator>
  ) : token ? (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationString.VIP} component={VIP} />
      <Stack.Screen name={NavigationString.PLAN} component={Plans} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
      <Stack.Screen
        name={NavigationString.DETAILS_PAGE}
        component={DetailsPage}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationString.VIP} component={VIP} />
      <Stack.Screen name={NavigationString.LOGIN} component={Login} />
      <Stack.Screen name={NavigationString.PLAN} component={Plans} />
      <Stack.Screen name={NavigationString.REGISTER} component={Register} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
      <Stack.Screen
        name={NavigationString.DETAILS_PAGE}
        component={DetailsPage}
      />
    </Stack.Navigator>
  );
}
