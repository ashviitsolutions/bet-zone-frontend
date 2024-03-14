import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
const {width, height} = Dimensions.get('screen');
import {useNavigation} from '@react-navigation/native';
import {IP} from '../../Constants/Server';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
import ContactAreaComp from '../../Components/ContactAreaComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

function VIP() {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [membership, setMemberhsip] = useState(true);

  const [membershipLevel, setMembershipLevel] = useState('');
  const [status, setStatus] = useState('');
  const [membershipEndDate, setMembershipEndDate] = useState('');

  useEffect(() => {
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
    const unsubscribe = navigation.addListener('state', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePress = () => {
    {
      token
        ? navigation.navigate(NavigationString.PLAN)
        : navigation.navigate('LOGIN');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <View style={styles.mainConatiner}>
        <View style={styles.headingView}>
          <Image source={ImagePath.mikeIcon} style={styles.IconStyle} />
          <Text style={styles.VipText}>VIP TIPS</Text>
          <Image source={ImagePath.starsIcon} style={styles.mikeIconStyle} />
        </View>

        <View style={styles.cardBox}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              color: Colors.whiteText,
              textAlign: 'center',
            }}>
            {' '}
            To Access the VIP TIPS you have to create an account and buy
            membership
          </Text>
        </View>

        <Button
          w={40}
          h={5}
          br={6}
          title={'BUY MEMBERSHIP'}
          onPress={handlePress}
        />

        {!token && (
          <View style={styles.loginLinkArea}>
            <Text style={{color: Colors.grayText}}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LOGIN')}
              activeOpacity={0.8}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}

        <ContactAreaComp />
      </View>
    </SafeAreaView>
  );
}

export default VIP;

const styles = StyleSheet.create({
  mainConatiner: {
    backgroundColor: Colors.mainColor,
    height: responsiveHeight(100),
    padding: 10,
  },
  headingView: {
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  IconStyle: {
    width: responsiveWidth(8),
    tintColor: Colors.whiteText,
    top: -responsiveHeight(1.2),
    left: -responsiveWidth(0.3),
  },
  VipText: {
    fontSize: responsiveFontSize(5),
    color: Colors.whiteText,
    fontWeight: '900',
  },
  mikeIconStyle: {
    width: responsiveWidth(6),
    top: -responsiveHeight(1),
    left: responsiveWidth(-1),
  },
  cardBox: {
    backgroundColor: Colors.brownColor,
    width: width * 0.95,
    height: height * 0.12,
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
  },
  loginLinkArea: {
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: responsiveHeight(1.5),
  },
  loginText: {color: Colors.grayText},
});
