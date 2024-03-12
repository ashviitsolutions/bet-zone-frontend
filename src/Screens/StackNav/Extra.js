import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
import Tabs from '../../Navigation/TabsNav';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ContactAreaComp from '../../Components/ContactAreaComp';
function Plans() {
  const navigation = useNavigation();
  const Data = [
    { id: 1, price: '13$/month', type: 'MONTHLY SUBSCRIPTION' },
    { id: 2, price: '13$/month', type: '3 MONTH SUBSCRIPTION' },

  ];

  function Card() {
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
      <View
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 5,
        }}>
        <View
          style={{
            height: responsiveHeight(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              color: Colors.whiteText,
              fontWeight: '900',
            }}>
            PLANS
          </Text>
        </View>

        <ScrollView style={{ flex: 1, padding: 10, height: 'auto' }}>
          <FlatList
            data={Data}
            renderItem={({ item }) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: height*0.22 }}
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
