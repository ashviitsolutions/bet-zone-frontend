import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { IP } from '../Constants/Server';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function VIPNavStack() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState(true);
  const [membershipLevel, setMembershipLevel] = useState('');
  const [status, setStatus] = useState('');
  const [membershipEndDate, setMembershipEndDate] = useState('');
const [userId,setUserId]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('userid');
        setUserId(data)
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getUserMembership = async () => {
      try {
        setLoading(true)
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
        // console.warn('membership', data);

        setMembershipLevel(data.membershipType);
        await AsyncStorage.setItem('membership', data.membershipType);
        setStatus(data.status);
        
        setMembership(data.status === 'active');

        const daysToAdd = data.renewalDays;
        const result = new Date(data.lastRenewalPaymentDate);
        result.setDate(result.getDate() + daysToAdd);
        setMembershipEndDate(result);
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUserMembership();
  }, [token]);

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

// console.warn(status)

  if (loading) {
    return <Loadercomp />;
  }

  return status=='active' && token ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigationString.VIP_TIPS} component={VipTips} />
      <Stack.Screen name={NavigationString.CONTACTS} component={Contacts} />
      <Stack.Screen
        name={NavigationString.DETAILS_PAGE}
        component={DetailsPage}
      />
    </Stack.Navigator>
  ) : token ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
