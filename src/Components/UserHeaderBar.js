import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import ImagePath from '../Constants/ImagePath';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../Constants/Colors';
import {useNavigation} from '@react-navigation/native';

const UserHeaderBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerBox}>
      <Text style={styles.leftText_style}>PREVIOUS TIPS</Text>
      <View style={{flexDirection: 'row'}}>
        <Image source={ImagePath.PhoneIcon} style={styles.phone_icon} />
        <Text
          onPress={() => navigation.navigate('Contacts')}
          style={styles.rightText_style}>
          CONTACTS
        </Text>
      </View>
    </View>
  );
};

export default UserHeaderBar;

const styles = StyleSheet.create({
  headerBox: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    paddingBottom: responsiveHeight(1),
  },
  leftText_style: {
    color: Colors.whiteText,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '500',
  },
  phone_icon: {
    width: responsiveWidth(5),
    height: responsiveHeight(2),
    tintColor: Colors.grayText,
    marginRight: responsiveWidth(1),
  },
  rightText_style: {
    color: Colors.grayText,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
  },
});
