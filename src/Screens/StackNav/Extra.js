import React, { useState } from 'react';
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
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import ContactAreaComp from '../../Components/ContactAreaComp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from '../../Constants/Server';

const { width, height } = Dimensions.get('screen');

function Plans() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(null);
  const [url, setUrl] = useState(null);

  const Data = [
    { id: "price_1OAn62LnVrUYOeK2Y2M7l0Cj", price: '13$/month', name: 'MONTHLY SUBSCRIPTION' },
    { id: "price_1OMYiBLnVrUYOeK2LPEbMEvW", price: '13$/month', name: '3 MONTH SUBSCRIPTION' },
  ];

  const handleSubmit = async (membership_id, index) => {
    console.log("membership_id", membership_id)
    setLoading(index);
    try {
      const user_id = "65ddb8bd879352c6c84dcb4d"
      const token = await AsyncStorage.getItem('token');
      const url = `http://45.13.132.197:5000/api/payment/create-checkout-session?membership=${membership_id}&userId=${user_id}`;
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
      Linking.openURL(res.config.url); // Redirect user to Stripe checkout page
      if (res.config.url) {
        // Redirect to Stripe checkout page
        Linking.openURL(res.config.url); // Redirect user to Stripe checkout page
      } else {
        console.error('Invalid response from the server:', res);
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('API Error', error.message);
    } finally {
      if (loading === index) {
        setLoading(null); // Reset loading state only if it matches the index
      }
    }
  };

  const Card = ({ item, index }) => {
    return (
      <View style={styles.main_container}>
        <Image source={ImagePath.publicIcon} style={styles.icon_style} />
        <View>
          <Text style={styles.monthy_subs_text}>{item.name}</Text>
          <Text style={{ color: Colors.whiteText, fontSize: responsiveFontSize(1.6) }}>{item.price}</Text>
        </View>
        <View style={styles.buy_box}>
          <TouchableOpacity onPress={() => handleSubmit(item.id, index)} >
            <Text style={styles.buy_text}>BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ backgroundColor: Colors.mainColor, height: '100%', padding: 5 }}>
        <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: responsiveFontSize(3), color: Colors.whiteText, fontWeight: '900' }}>PLANS</Text>
        </View>
        <ScrollView style={{ flex: 1, padding: 10, height: 'auto' }}>
          <FlatList
            data={Data}
            renderItem={({ item, index }) => <Card item={item} index={index} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <ContactAreaComp />
        </ScrollView>
      </View>
    </SafeAreaView>
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
});
