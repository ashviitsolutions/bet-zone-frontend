import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  RefreshControl,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ContactAreaComp from '../../Components/ContactAreaComp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from '../../Constants/Server';
import Loader from '../../Components/Loader';
import NavigationString from '../../Constants/NavigationString';

const {width, height} = Dimensions.get('screen');

function Plans() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(null);
  const [url, setUrl] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [user_id, setUserid] = useState(null);
  const [membership, setMembership] = useState(true);
  const [membershipLevel, setMembershipLevel] = useState('');
  const [status, setStatus] = useState('');
  const [membershipEndDate, setMembershipEndDate] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getUserMembership = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
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
      const daysToAdd = data.renewalDays;
      const result = new Date(data.lastRenewalPaymentDate);
      result.setDate(result.getDate() + daysToAdd);
      setMembershipEndDate(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Call getUserMembership initially
    getUserMembership();

    // Call getUserMembership every 1 second
    const intervalId = setInterval(() => {
      getUserMembership();
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Rest of your code...



  const onRefersh = () => {
    getUserMembership();
  };

  console.log('sessionid data availble', status);

  const Data = [
    {
      id: 'price_1Ola6GGJyA6XB6N0nyCrs0iP',
      price: '13$/month',
      name: '1 MONTHLY SUBSCRIPTION',
      membershipType: '1 MONTH',
    },
    {
      id: 'price_1OlaAjGJyA6XB6N0wEiaH8Xr',
      price: '13$/month',
      name: '3 MONTH SUBSCRIPTION',
      membershipType: '3 MONTH',
    },
  ];

  const handleSubmit = async (membership_id, index, membershipType) => {
    console.log('membership_id', membership_id);
    setLoading(true);
    try {
      const user_id = await AsyncStorage.getItem('userid');
      console.log('user_id id', user_id);
      const token = await AsyncStorage.getItem('token');
      const url = `${IP}/payment/create-checkout-session?membership=${membership_id}&userId=${user_id}&membershipType=${membershipType}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };

      const res = await axios.get(url, config);
      console.log('Stripe Redirect URL:', url);
      setUrl(res.config.url);

      console.log('API Response:', res);
      if (res.config.url) {
        setLoading(false);
        setSelectedId(membership_id);
        setUserid(user_id);
        // Redirect to Stripe checkout page
        Linking.openURL(res.config.url);
        setRedirecting(true);
        // navigation.navigate(NavigationString.SUCCESS_PAGE)
      } else {
        console.error('Invalid response from the server:', res);
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('API Error', error.message);
    } finally {
      if (loading === index) {
        setLoading(false); // Reset loading state only if it matches the index
      }
    }
  };

  useEffect(() => {
    if (status == 'active') {
      navigation.navigate(NavigationString.SUCCESS_PAGE, {
        id: selectedId,
        user_id: user_id,
        session_id: sessionID,
      });
    }
  }, [status]);

  const Card = ({item, index}) => {
    return (
      <View style={styles.main_container}>
        <Image source={ImagePath.publicIcon} style={styles.icon_style} />
        <View>
          <Text style={styles.monthy_subs_text}>{item.name}</Text>
          <Text
            style={{
              color: Colors.whiteText,
              fontSize: responsiveFontSize(1.6),
            }}>
            {item.price}
          </Text>
        </View>
        <View style={styles.buy_box}>
          <TouchableOpacity
            onPress={() => handleSubmit(item.id, index, item.membershipType)}>
            <Text style={styles.buy_text}>BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Header />
        <View
          style={{
            backgroundColor: Colors.mainColor,
            height: '100%',
            padding: 5,
          }}>
          <View
            style={{
              height: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.plantext}>PLANS</Text>
          </View>
          <ScrollView
            style={{flex: 1, padding: 10, height: 'auto'}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefersh}
                // Set the color of the loading indicator
                colors={[Colors.mainColor]}
              />
            }>
            <FlatList
              data={Data}
              renderItem={({item, index}) => <Card item={item} index={index} />}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
            <ContactAreaComp />
          </ScrollView>
        </View>
      </SafeAreaView>
      {loading ? <Loader /> : null}
    </>
  );
}

export default Plans;

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: Colors.brownColor,
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(10),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    padding: 10,
  },
  icon_style: {
    width: responsiveWidth(12),
    height: responsiveHeight(5.5),
    tintColor: Colors.grayText,
  },
  monthy_subs_text: {
    color: Colors.whiteText,
    fontWeight: '900',
    fontSize: responsiveFontSize(1.8),
  },
  buy_box: {
    backgroundColor: Colors.secondaryColor,
    width: responsiveWidth(15),
    height: responsiveHeight(3.5),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buy_text: {
    color: Colors.blackText,
    fontWeight: '500',
    fontSize: responsiveFontSize(1.5),
  },
  plantext: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
  },
});
