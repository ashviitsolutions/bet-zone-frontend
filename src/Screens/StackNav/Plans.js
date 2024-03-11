import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../Constants/Server';
import axios from 'axios';
import { Linking } from 'react-native';

import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Colors from '../../Constants/Colors';
import ContactAreaComp from '../../Components/ContactAreaComp';

const { width, height } = Dimensions.get('screen');

function Plans() {
  const navigation = useNavigation();

  const Data = [
    { id: 'price_1OAn62LnVrUYOeK2Y2M7l0Cj', price: '13$/month', type: 'MONTHLY SUBSCRIPTION' },
    { id: 'price_1OMYiBLnVrUYOeK2LPEbMEvW', price: '13$/month', type: '3 MONTH SUBSCRIPTION' },
  ];
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(null);

  const [membershipLevel, setMembershipLevel] = useState();
  const [membershipEndDate, setMembershipEndDate] = useState();

  const [url, setUrl] = useState(null);

  const handleSubmit = async (membership_id) => {
    console.log(membership_id)
    try {
      const user_id = await AsyncStorage.getItem('userid');
      const token = await AsyncStorage.getItem('token');
      const url = `${IP}/payment/create-checkout-session?membership=${membership_id}&userId=${user_id}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      const res = await axios.get(url, config);
      console.log('rdddd',res)
      console.log('Stripe Redirect URL:', res.config.url);

      if (res.config.url) {
        await Linking.openURL(res.config.url);
      } else {
        console.error('Invalid response from the server:', res);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      // Add any cleanup or additional logic here
    }
  };

  useEffect(() => {
    const getUserMembership = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
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

        const daysToAdd = data.renewalDays;
        const result = new Date(data.lastRenewalPaymentDate);
        result.setDate(result.getDate() + daysToAdd);
        setMembershipEndDate(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getUserMembership();
  }, [membershipLevel]);

  console.log(membershipLevel, membershipEndDate);

  const Card = ({ item }) => {
    return (
      <View style={styles.main_container}>
        <Image source={ImagePath.publicIcon} style={styles.icon_style} />
        <View>
          <Text style={styles.monthly_subs_text}>{item.type}</Text>
          <Text style={{ color: Colors.whiteText, fontSize: responsiveFontSize(1.6) }}>{item.price}</Text>
        </View>
        <View style={styles.buy_box}>
          <TouchableOpacity onPress={() => handleSubmit(item.id)} >
            <Text style={styles.buy_text}>BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>PLANS</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <FlatList
            data={Data}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />

          <ContactAreaComp />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor,
    padding: 5,
  },
  titleContainer: {
    height: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveFontSize(3),
    color: Colors.whiteText,
    fontWeight: '900',
  },
  scrollView: {
    flex: 1,
    padding: 10,
    height: 'auto',
  },
  main_container: {
    backgroundColor: Colors.brownColor,
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(10),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
  },
  icon_style: {
    width: responsiveWidth(12),
    height: responsiveHeight(5.5),
    tintColor: Colors.grayText,
  },
  monthly_subs_text: {
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
});

export default Plans;
