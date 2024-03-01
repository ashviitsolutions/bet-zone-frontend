import React from 'react';
import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import Colors from '../../Constants/Colors';
import Header from '../../Components/Header';
import ImagePath from '../../Constants/ImagePath';
import Button from '../../Components/Button';
const { width, height } = Dimensions.get('screen');
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import NavigationString from '../../Constants/NavigationString';
import ContactAreaComp from '../../Components/ContactAreaComp';
function VIP() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          backgroundColor: Colors.mainColor,
          height: responsiveHeight(100),
          padding: 10,
        }}>
        <View
          style={{
            height: responsiveHeight(15),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={ImagePath.mikeIcon}
            style={{
              width: responsiveWidth(8),
              tintColor: Colors.whiteText,
              top: -responsiveHeight(1.2),
              left: -responsiveWidth(0.3),
            }}
          />

          <Text
            style={{
              fontSize: responsiveFontSize(5),
              color: Colors.whiteText,
              fontWeight: '900',
            }}>
            VIP TIPS
          </Text>
          <Image
            source={ImagePath.starsIcon}
            style={{
              width: responsiveWidth(6),
              top: -responsiveHeight(1),
              left: responsiveWidth(-1),
            }}
          />
        </View>

        <View
          style={{
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
          }}>
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
          onPress={() => navigation.navigate(NavigationString.CREATE_ACCOUNT)}
        />

        <ContactAreaComp />
      </View>
    </SafeAreaView>
  );
}

export default VIP;
