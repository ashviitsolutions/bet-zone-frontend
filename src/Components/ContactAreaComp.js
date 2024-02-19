import {View, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const ContactAreaComp = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
      <Text
        style={{
          color: Colors.grayText,
          padding: 30,
          textAlign: 'center',
          fontSize: responsiveFontSize(1.5),
        }}>
        if you are having any issue in buying membership you can contact us
        directly
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20%',
        }}>
        <Image
          source={require('../assets/icons/phone.png')}
          style={{
            width: responsiveWidth(5),
            height: responsiveHeight(2.5),
            tintColor: Colors.grayText,
          }}
        />
        <Text
          onPress={() => navigation.navigate('Contacts')}
          style={{
            color: Colors.grayText,
            fontSize: responsiveFontSize(1.3),
            marginLeft: responsiveWidth(2),
          }}>
          CONTACTS
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ContactAreaComp;
